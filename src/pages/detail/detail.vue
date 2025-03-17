<!-- description:  -->
<!-- fileName: detail.vue -->
<!-- author: iwen(1044803551@qq.com) -->

<script setup>
    const info = ref({})
    const title = ref("")
    const videoUrl = ref("")
    const posterImg = ref("")
    const videoContext = ref(null)

    // 暂停
    const pause = () => {
        this.isFirstPlay = false
    }

    const getNetWorkVideo = () => {
        videoUrl.value = info.value.mpegUrl; 
        console.log(videoUrl.value,'videoUrl.value');
        
    }

    onLoad((options) => {

        info.value = options.articleInfo ? JSON.parse(decodeURIComponent(options.articleInfo)) : {};

        title.value = info.value.title;
        videoUrl.value = info.value.mpegUrl;
        posterImg.value = info.value.previewUrl;

        getNetWorkVideo()
    })
</script>

<template>
    <view class="container-detail">
        <video style="width: 100%; height: 100%" id="myVideo" :title="title" :src="videoUrl" :poster="posterImg"
            controls page-gesture show-mute-btn enable-play-gesture object-fit="contain" :custom-cache="false"
            @pause="pause"></video>
    </view>
</template>

<style lang='scss' scoped>
    .container-detail {
        width: 100%;
        height: 627px;
        overflow: hidden;

        .video {
            width: 100%;
            height: 627px;
            position: relative;

            .no-network {
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.3);
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                z-index: 9999;
                display: block;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        .container {
            padding: 10px;
        }
    }
</style>
<route lang="json">
    {
        "layout": "home"
    }
</route>