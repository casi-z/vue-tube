<template>

  <v-container>
    <v-row>

      <v-col>

        <div
          class="video-container"

        >
          <div :class="`video-click-indicator active-${isPlayIndicatorActive}`">
            <v-icon
              v-if="isPlaying"
              icon="mdi-play"
            />
            <v-icon
              v-else
              icon="mdi-pause"
            />
          </div>
          <v-chip :class="`fast-speedup-indicator px-5 visible-${isFastSpeedUp}`">
            2X
          </v-chip>
          <video
            ref="video"
            @click="handleVideoClick"
            @mousedown="startPress"
            @mouseup="resetVideoSpeed"
            @mouseleave="resetVideoSpeed"
            @timeupdate="updateTime"
            @loadedmetadata="updateDuration"
          >
            <source
              src="/src/assets/video/video.mp4"
              type="video/mp4"
            >
            Ваш браузер не поддерживает видео.
          </video>

          <v-container class="controls">
            <v-row no-gutters>
              <v-col
                cols="12"
                class="px-0 py-0"
              >
                <v-slider
                  class="video-slider"
                  v-model="currentTime"
                  density="compact"
                  color="rgb(251, 0, 44)"
                  thumb-color="rgb(251, 0, 44)"
                  track-color="rgba(255,255,255,.2)"
                  :max="duration"
                  @click="seek"
                />
              </v-col>
              <v-row
                justify="space-between"
                align="center"
                cols="12"
                class="pr-2"
              >
                <v-col cols="4" class="controls-left">
                  <v-btn
                    v-if="isPlaying"
                    density="comfortable"
                    icon="mdi-pause"
                    class="bg-transparent"
                    @click="togglePlay"
                  />
                  <v-btn
                    v-else
                    density="comfortable"
                    icon="mdi-play"
                    @click="togglePlay"
                    class="bg-transparent"
                  />


                  <span class="text-subtitle-1">{{ formattedCurrentTime }} / {{ formattedDuration }}</span>

                  <Volume :video="video" />
                </v-col>

                <v-btn
                  density="comfortable"
                  @click="toggleFullScreen"
                  icon="mdi-fullscreen"
                  class="bg-transparent"
                />
              </v-row>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';

const video = ref<HTMLVideoElement | null>(null);
const isPlaying = ref<boolean>(false);
const currentTime = ref<number>(0);
const duration = ref<number>(0);
const isFastSpeedUp = ref<boolean>(false)
const isFullScreen = ref<boolean>(false)
const isPlayIndicatorActive = ref<boolean>(false)



const handleVideoClick = () => {
  togglePlay()
}
const togglePlay = () => {
  if (isPlaying.value) {
    video.value?.pause();
  } else {
    video.value?.play();
  }
  isPlaying.value = !isPlaying.value;

  isPlayIndicatorActive.value = true

  setTimeout(() => isPlayIndicatorActive.value = false, 500)
};

const updateTime = () => {
  if (video?.value?.currentTime) {
    currentTime.value = video?.value?.currentTime
  }
};

const updateDuration = () => {
  if (video?.value?.duration) {
    duration.value = video?.value.duration;
  }
};

const seek = () => {
  if (video?.value?.currentTime) {
    video.value.currentTime = currentTime.value;
  }
};

const formattedCurrentTime = computed(() => formatTime(currentTime.value));
const formattedDuration = computed(() => formatTime(duration.value));

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

const pressTimer = ref<ReturnType<typeof setTimeout> | null>(null);

const startPress = () => {
  // Устанавливаем таймер на 500ms (или любое другое значение)
  pressTimer.value = setTimeout(() => {
    speedUpVideo();
  }, 500); // Длительность нажатия
};

const resetVideoSpeed = () => {
  // Очищаем таймер, если нажатие было прекращено
  if (pressTimer.value && video.value) {
    clearTimeout(pressTimer.value);
    video.value.playbackRate = 1
    isFastSpeedUp.value = false
    pressTimer.value = null;
  }
};

const speedUpVideo = () => {

  if (video.value && video.value.played) {
    isFastSpeedUp.value = true
    video.value.playbackRate = 2
  }
};

function toggleFullScreen() {

  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    isFullScreen.value = true
  } else if (document.exitFullscreen) {
    isFullScreen.value = false
    document.exitFullscreen();
  }

}
</script>

<style lang="scss">

.video-container {

  width: 1280px;
  height: 720px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;

  .video-click-indicator {
    border-radius: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    opacity: 0;
    font-size: 70px;

    .v-icon {
      font-size: inherit;
    }

    &.active-true {
      animation: grow 500ms linear 1;
    }

    @keyframes grow {
      0% {
        opacity: 1;

      }
      100% {
        width: 300px;
        height: 300px;
        opacity: 0;

        font-size: 210px;

      }
    }
  }

  .fast-speedup-indicator {
    position: absolute;
    top: 2%;
    left: 50%;
    transform: translateX(-50%);
    padding-left: 1vw;
    background: rgba(0, 0, 0, .5);
    display: none;
    padding-right: 1vw;

    &.visible-true {
      display: flex;
    }
  }

  &:hover {
    .controls {
      opacity: 1;
    }
  }

  .controls {
    width: 100%;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 1;
    transition-duration: 300ms;

    .v-btn--icon {
      font-size: 21px;
    }

    .controls-left {
      gap: 16px;
      display: flex;
      align-items: center;
    }

    .volume-slider {
      .v-slider-thumb {
        width: 10px;
        height: 10px;

        &__surface {
          width: inherit;
          height: inherit;
        }
      }

      .v-input__control {
        width: 60px;

      }

      .v-slider-track {

        height: 4px;
        border-radius: 0;
      }
    }
  }

}

@media all and (display-mode: fullscreen) {
  /* здесь можно написать CSS,
  который будет работать только
  в полноэкранном режиме */
  html {
    overflow: hidden;
  }
  body {
    overflow: hidden;

    #app {
      overflow: hidden;

    }

    .video-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      video {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.video {
  width: 1280px;
  height: 720px
}

.v-input__details {
  display: none !important;
}

.video-slider {
  margin-bottom: 8px;
  $slider-track-border-radius: 0px;

  .v-slider-thumb {
    transition-duration: 300ms;
    opacity: 0;
    width: 20.02px;
    height: 20.02px;

    &__surface {
      width: inherit;
      height: inherit;
    }
  }

  .v-input__control {
    min-height: 0 !important;
  }

  .v-slider-track {
    border-radius: 0;
    height: 4px !important;
  }

  &:hover {
    .v-slider-thumb {
      opacity: 1;
    }
  }
}
</style>
