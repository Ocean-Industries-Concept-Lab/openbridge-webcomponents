#!/usr/bin/env python3
import os, re, subprocess, csv, json, glob

ROOT = "/home/user/openbridge-webcomponents/packages/openbridge-webcomponents"
SRC = os.path.join(ROOT, "src")

prop_re = re.compile(
    r'@property\([^)]*\)\s+'
    r'(?:(?:override|accessor|readonly|declare|public|private|protected)\s+)*'
    r'([A-Za-z_$][A-Za-z0-9_$]*)')
state_re = re.compile(r'@state\([^)]*\)\s+([A-Za-z_$][A-Za-z0-9_$]*)')
class_re = re.compile(r'export\s+(?:abstract\s+)?class\s+([A-Za-z0-9_$]+)\s+extends\s+([A-Za-z0-9_$]+)(\(([A-Za-z0-9_$]+)\))?')
custom_re = re.compile(r"@customElement\(\s*['\"]([^'\"]+)['\"]")

# ---- Build registry of all classes across src ----
registry = {}  # className -> {file, super, mixin, props:[name], tag}
all_ts = [p for p in glob.glob(os.path.join(SRC, "**", "*.ts"), recursive=True)
          if not p.endswith(".stories.ts") and not p.endswith(".test.ts") and not p.endswith(".spec.ts")]

# also include the mixin file class (non-exported)
mixin_class_re = re.compile(r'class\s+([A-Za-z0-9_$]+)\s+extends\s+superClass')

for path in all_ts:
    with open(path) as f:
        lines = f.readlines()
    text = "".join(lines)
    # find class blocks: handle multiple classes by scanning matches
    matches = list(class_re.finditer(text))
    mixin_matches = list(mixin_class_re.finditer(text))
    decls = []
    for m in matches:
        decls.append((m.start(), m.group(1), m.group(2), m.group(4)))
    for m in mixin_matches:
        decls.append((m.start(), m.group(1), "superClass", None))
    decls.sort()
    for i, (start, cname, sup, mixin_base) in enumerate(decls):
        end = decls[i+1][0] if i+1 < len(decls) else len(text)
        body = text[start:end]
        props = prop_re.findall(body)
        # tag: find @customElement just before class start
        pre = text[:start]
        tagm = None
        for tm in custom_re.finditer(pre):
            tagm = tm.group(1)
        registry[cname] = {
            "file": os.path.relpath(path, ROOT),
            "super": sup,
            "mixin_base": mixin_base,  # for SetpointMixin(Base)
            "props": props,
            "tag": tagm,
        }

def lookup(name):
    """Resolve a class/mixin name to registry info, handling the *Class alias."""
    return registry.get(name) or registry.get(name + "Class")

def parents_of(name):
    info = lookup(name)
    if not info:
        return []
    if info["mixin_base"]:           # e.g. SetpointMixin(ObcChartLineBase)
        return [info["super"], info["mixin_base"]]
    if info["super"] in ("LitElement", "superClass"):
        return []
    return [info["super"]]

def resolve_chain(cname):
    """Return ordered list of ancestor class names (excluding LitElement/Object)."""
    chain, seen = [], set()
    stack = list(parents_of(cname))
    while stack:
        name = stack.pop(0)
        if not name or name in seen or name in ("LitElement", "superClass"):
            continue
        seen.add(name)
        chain.append(name)
        stack = list(parents_of(name)) + stack
    return chain

# ---- Parse stories: tag -> {storyFile, title} ----
comp_meta_re = re.compile(r"component:\s*['\"]([^'\"]+)['\"]")
title_re = re.compile(r"title:\s*['\"]([^'\"]+)['\"]")
stories = {}  # tag -> {file, title}
for path in glob.glob(os.path.join(SRC, "**", "*.stories.ts"), recursive=True):
    with open(path) as f:
        text = f.read()
    tm = comp_meta_re.search(text)
    tlm = title_re.search(text)
    if tm and re.fullmatch(r'[a-z][a-z0-9]*(-[a-z0-9]+)+', tm.group(1)):
        tag = tm.group(1)
        stories.setdefault(tag, {"file": os.path.relpath(path, ROOT),
                                 "title": tlm.group(1) if tlm else ""})

# tag -> className
tag_to_class = {info["tag"]: c for c, info in registry.items() if info["tag"]}

# ---- git last property-change commit for a file ----
ROOT_COMMIT = subprocess.check_output(
    ["git", "-C", ROOT, "rev-list", "--max-parents=0", "HEAD"]
).decode().split()[0][:7]
git_cache = {}
def last_prop_commit(relpath):
    if relpath in git_cache:
        return git_cache[relpath]
    try:
        out = subprocess.check_output(
            ["git", "-C", ROOT, "log", "-G", "@property", "-1",
             "--format=%ad|%h|%s", "--date=short", "--", relpath],
            stderr=subprocess.DEVNULL).decode().strip()
    except subprocess.CalledProcessError:
        out = ""
    git_cache[relpath] = out
    return out

# ---- Build rows ----
rows = []
for tag, sinfo in sorted(stories.items()):
    cname = tag_to_class.get(tag)
    if not cname:
        rows.append({
            "tag": tag, "class": "(not found)", "file": "",
            "story_title": sinfo["title"], "story_file": sinfo["file"],
            "superclass_chain": "", "own_props": "", "own_count": 0,
            "inherited_props": "", "inherited_count": 0, "all_count": 0,
            "last_prop_commit_date": "", "last_prop_commit": "",
            "last_prop_commit_source": "", "prop_changed_since_import": "unknown",
        })
        continue
    info = registry[cname]
    own = info["props"]
    chain = resolve_chain(cname)
    inherited = []  # (prop, source class)
    files_to_check = [info["file"]]
    for anc in chain:
        ainfo = lookup(anc) or {}
        for p in ainfo.get("props", []):
            inherited.append(f"{p} <- {anc}")
        if ainfo.get("file") and ainfo["file"] not in files_to_check:
            files_to_check.append(ainfo["file"])
    # last prop commit across own + ancestor files, pick newest
    best = None
    for fp in files_to_check:
        c = last_prop_commit(fp)
        if c:
            date = c.split("|")[0]
            if best is None or date > best[0]:
                best = (date, c, fp)
    rows.append({
        "tag": tag,
        "class": cname,
        "file": info["file"],
        "story_title": sinfo["title"],
        "story_file": sinfo["file"],
        "superclass_chain": " -> ".join(chain) if chain else "LitElement",
        "own_props": ", ".join(own),
        "own_count": len(own),
        "inherited_props": ", ".join(inherited),
        "inherited_count": len(inherited),
        "all_count": len(own) + len(inherited),
        "last_prop_commit_date": best[0] if best else "",
        "last_prop_commit": best[1].split("|",1)[1] if best else "",
        "last_prop_commit_source": os.path.basename(best[2]) if best else "",
        "prop_changed_since_import":
            "no (unchanged since import)" if best and best[1].split("|")[1] == ROOT_COMMIT
            else ("yes" if best else "unknown"),
    })

# write CSV
cols = ["tag","class","file","story_title","story_file","superclass_chain",
        "own_count","own_props","inherited_count","inherited_props","all_count",
        "last_prop_commit_date","last_prop_commit","last_prop_commit_source",
        "prop_changed_since_import"]
outcsv = os.path.join(ROOT, "docs", "component-stories-inventory.csv")
os.makedirs(os.path.dirname(outcsv), exist_ok=True)
with open(outcsv, "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=cols)
    w.writeheader()
    for r in rows:
        w.writerow(r)

print(f"rows: {len(rows)}")
print(f"with class resolved: {sum(1 for r in rows if r['class'] not in ('(not found)',))}")
print(f"not found: {[r['tag'] for r in rows if r['class']=='(not found)']}")
print(f"with superclass (not LitElement): {sum(1 for r in rows if r['superclass_chain']!='LitElement')}")
print("CSV:", outcsv)
