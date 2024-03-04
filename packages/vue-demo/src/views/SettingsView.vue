<script setup lang="ts">
import ObcInput from '@oicl/openbridge-webcomponents-vue/components/input/ObcInput'
import ObcRichButton from '@oicl/openbridge-webcomponents-vue/components/rich-button/ObcRichButton'
import { ObcRichButtonSize } from '@oicl/openbridge-webcomponents/dist/components/rich-button/rich-button'
import '@oicl/openbridge-webcomponents/dist/icons/icon-02-chevron-right'
import '@oicl/openbridge-webcomponents/dist/icons/icon-01-content-copy'
import '@oicl/openbridge-webcomponents/dist/icons/icon-03-license'
import '@oicl/openbridge-webcomponents/dist/icons/icon-01-placeholder'

const openOicl = () => {
  window.open('https://www.oicl.no', '_blank')
}
</script>

<template>
  <div class="wrapper">
    <ObcInput placeholder="Search">
      <template #icon>
        <obi-01-search></obi-01-search>
      </template>
    </ObcInput>
    <div class="row">
      <div class="col">
        <ObcRichButton has-trailing-icon position="top" has-graphic border @click="openOicl">
          <template #label> OICL </template>

          <template #trailing-icon>
            <obi-02-chevron-right></obi-02-chevron-right>
          </template>

          <template #graphic>
            <div class="logo">
              <svg
                width="96"
                height="97"
                viewBox="0 0 96 97"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.3999 20.2157C38.5997 4.59476 63.2435 4.59476 78.4433 20.2157C86.0338 28.0166 85.2635 38.8884 79.6537 45.8018C76.8582 49.2468 72.8785 51.6758 68.1522 52.2295C63.4327 52.7824 57.8327 51.4795 51.7863 47.2074C45.2364 42.5795 39.0134 41.1136 33.5683 41.941C28.1341 42.7668 23.6534 45.8504 20.5396 49.9819C17.2884 54.2959 15.46 59.8731 15.6212 65.3744C8.9237 50.5731 11.5166 32.4283 23.3999 20.2157Z"
                  fill="#1A1A1A"
                />
                <path
                  d="M80 76.0616C79.8066 76.2719 79.6107 76.4807 79.4121 76.6877C64.3055 92.4374 39.8129 92.4374 24.7064 76.6877C18.1792 69.8822 18.8322 58.9105 24.2623 51.6014C26.9443 47.9913 30.7318 45.3838 35.2562 44.6864C39.7697 43.9906 45.1946 45.1692 51.1998 49.4736C51.3214 49.5607 51.4429 49.6468 51.5644 49.7318C44.5741 73.46 66.5785 83.5872 80 76.0616Z"
                  fill="black"
                  fill-opacity="0.59"
                />
              </svg>
            </div>
          </template>
        </ObcRichButton>
        <ObcRichButton has-trailing-icon has-status border position="center">
          <template #label> Model </template>

          <template #status> 1.2.3456 </template>

          <template #trailing-icon>
            <obi-01-content-copy></obi-01-content-copy>
          </template>
        </ObcRichButton>
        <ObcRichButton has-trailing-icon has-status position="bottom">
          <template #label> Version </template>

          <template #status> 1.2.3456 </template>

          <template #trailing-icon>
            <obi-01-content-copy></obi-01-content-copy>
          </template>
        </ObcRichButton>
      </div>
      <div class="col">
        <ObcRichButton has-trailing-icon position="top" has-graphic border>
          <template #label> Systems and certificates </template>

          <template #trailing-icon>
            <obi-02-chevron-right></obi-02-chevron-right>
          </template>

          <template #graphic>
            <div class="logo">
              <obi-03-license></obi-03-license>
            </div>
          </template>
        </ObcRichButton>
        <ObcRichButton has-trailing-icon has-status border position="center">
          <template #label> Phone </template>

          <template #status> 000 00 000 </template>

          <template #trailing-icon>
            <obi-01-content-copy></obi-01-content-copy>
          </template>
        </ObcRichButton>
        <ObcRichButton has-trailing-icon has-status position="bottom">
          <template #label> Mail </template>

          <template #status> abc@oicl.com </template>

          <template #trailing-icon>
            <obi-01-content-copy></obi-01-content-copy>
          </template>
        </ObcRichButton>
      </div>
    </div>
    <div class="divider"></div>
    <div class="group">
      <ObcRichButton has-leading-icon has-trailing-icon :size="ObcRichButtonSize.DoubleLine">
        <template #leading-icon>
          <obi-01-placeholder></obi-01-placeholder>
        </template>
        <div slot="label">Runtime screen</div>
        <div slot="description">Description with a lot of text</div>
        <template #trailing-icon>
          <obi-02-chevron-right></obi-02-chevron-right>
        </template>
      </ObcRichButton>
      <ObcRichButton has-leading-icon has-trailing-icon :size="ObcRichButtonSize.DoubleLine">
        <template #leading-icon>
          <obi-01-placeholder></obi-01-placeholder>
        </template>
        <div slot="label">Calibration</div>
        <div slot="description">Description with a lot of text</div>
        <template #trailing-icon>
          <obi-02-chevron-right></obi-02-chevron-right>
        </template>
      </ObcRichButton>
      <ObcRichButton has-leading-icon has-trailing-icon :size="ObcRichButtonSize.DoubleLine">
        <template #leading-icon>
          <obi-01-placeholder></obi-01-placeholder>
        </template>
        <div slot="label">Devices</div>
        <div slot="description">Description with a lot of text</div>
        <template #trailing-icon>
          <obi-02-chevron-right></obi-02-chevron-right>
        </template>
      </ObcRichButton>

      <ObcRichButton has-leading-icon has-trailing-icon :size="ObcRichButtonSize.DoubleLine">
        <template #leading-icon>
          <obi-01-placeholder></obi-01-placeholder>
        </template>
        <div slot="label">Communication</div>
        <div slot="description">Description with a lot of text</div>
        <template #trailing-icon>
          <obi-02-chevron-right></obi-02-chevron-right>
        </template>
      </ObcRichButton>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 896px;
  margin: 0 auto;
  padding: 48px;

  gap: 32px;
}

@media screen and (max-width: 768px) {
  .wrapper {
    padding: 8px;
  }
}

.logo {
  width: 100%;
  height: 174px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo * {
  width: 96px;
  height: 96px;
  color: var(--element-neutral-color);
}

.row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.col {
  flex: 1;
  min-width: 220px;
}

.group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: var(--border-divider-color);
}
</style>
