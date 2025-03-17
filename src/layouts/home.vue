<!-- description: layout -->
<!-- fileName: home.vue -->
<!-- author: iwen(1044803551@qq.com) -->

<script setup>
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    
    const tabbarIndex = ref(0)
    let tabbarArr = ['pages/index/index', 'pages/ucenter/ucenter']
    tabbarIndex.value = tabbarArr.indexOf(currentPage.route)

    const navbarTitle = ref('标题')
    if (currentPage.route == 'pages/detail/detail') {
        let info = JSON.parse(decodeURIComponent(currentPage.options.articleInfo))
        navbarTitle.value = info.title
    }


    /** 切换页面 */
    const changeTabbar = (value) => {
        uni.reLaunch({
            url: '/' + tabbarArr[value.value]
        })
    }
    /** 返回 */
    const handleClickLeft = () => {
        uni.navigateBack({
            delta: 1,
            animationType: "slide-in-left",
            animationDuration: 200
        })
    }


</script>

<template>
    <view class="page">
        <view class="header" v-if="tabbarIndex == -1">
            <!-- <slot name="header">
                <view class="navbar">navbar</view>
            </slot> -->
            <wd-navbar :title="navbarTitle" left-arrow :bordered="false" :safeAreaInsetTop="true" @click-left="handleClickLeft"></wd-navbar>
        </view>

        <view class="main">
            <slot />
        </view>

        <view class="footer" v-if="tabbarIndex > -1">
            <wd-tabbar fixed v-model="tabbarIndex" active-color="#08b5b1" inactive-color="#7d7e80" bordered
                safeAreaInsetBottom placeholder @change="changeTabbar">
                <wd-tabbar-item title="知识库" icon="home"></wd-tabbar-item>
                <wd-tabbar-item title="我的" icon="user"></wd-tabbar-item>
            </wd-tabbar>
        </view>
    </view>
</template>

<style lang='scss' scoped>

    .page {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: #fff;

        .header {
            width: 100%;
            height: 40px;

            &::v-deep() {
                .wd-navbar {
                    height: 40px;
                    line-height: 40px;
                }
            }
        }

        .main {
            flex: 1;
        }

        .footer {
            width: 100%;
            height: 50px;
        }
    }

</style>