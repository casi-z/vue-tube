<script setup lang="ts">
import {ref} from "vue";


const {video} = defineProps<{
    video: HTMLVideoElement | null
}>()

const volume = ref(1); // Начальная громкость
const isMuted = ref(false); // Состояние звука

const updateVolume = () => {

    isMuted.value = volume.value === 0; // Если громкость 0, звук выключен
    // Здесь можно добавить логику для изменения громкости видео
    video.volume = volume.value

};

const toggleMute = () => {
    isMuted.value = !isMuted.value;
    volume.value = isMuted.value ? 0 : 1; // Если звук выключен, устанавливаем громкость в 0
    video.volume = isMuted.value ? 0 : 1;
    // Здесь можно добавить логику для изменения состояния звука видео
};


</script>

<template>
    <v-btn
            v-if="volume === 0"
            class="bg-transparent"
            density="comfortable"
            icon="mdi-volume-off"
            @click="toggleMute"
    />
    <v-btn
            v-else-if="volume >= 0.4 && volume <= 0.7"
            class="bg-transparent"
            density="comfortable"
            icon="mdi-volume-medium"
            @click="toggleMute"
    />
    <v-btn
            v-else
            class="bg-transparent"
            density="comfortable"
            icon="mdi-volume-high"
            @click="toggleMute"
    />
    <v-slider
            v-model="volume"
            class="volume-slider"
            :max="1"
            :min="0"
            step="0.01"
            color="white"
            thumb-color="white"
            track-color="white"
            @click="updateVolume"
    />
</template>

<style scoped lang="scss">

</style>
