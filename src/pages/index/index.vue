<!-- description: index -->
<!-- fileName: index.vue -->
<!-- author: iwen(1044803551@qq.com) -->

<script setup>
    import axios from "@/api/axios";
    import { onReachBottom } from '@dcloudio/uni-app';

    //获取首页文章列表
    const articleList = ref([]);
    const pageSize = ref(10);
    const pageNo = ref(1);
    const isEndPage = ref(false); //是否最后一页
    const pullScrollRef = ref(null)

    /** 获取文章列表 */
    const getArticleList = () => {
        // let params = {
        //     questionType:"",
        //     questionBank:"",
        //     questionContent:"",
        //     pageNo:pageNo.value,
        //     pageSize:pageSize.value,
        // }

        // axios.get('/getVideoContent.action', params).then(res=>{
        //     articleList.value = res.data
        // }).catch(err=>{
        //     console.log(err,'---err');
        // })


        // return
        let list = [
            {
                "imgUrl": "https://ymapp.cdcp.org.cn/nipisgd/static/file/mpeg/cover/msfbbp.png",
                "date": "2023-07-04",
                "previewUrl": "https://ymapp.cdcp.org.cn/nipisgd/static/file/mpeg/firstpic/msfbbp.png",
                "catalog": "0",
                "id": "40289f49891f9dec01891f9ef0260002",
                "viewCount": 8629,
                "source": "1",
                "title": "麻腮风疫苗和百白破疫苗",
                "contentType": "1",
                "content": "麻腮风疫苗和百白破疫苗",
                "seq": 8,
                "mpegUrl": "https://ymapp.cdcp.org.cn/nipisgd/static/file/mpeg/video/msfbbp.mp4"
            },
            {
                "imgUrl": "https://ymapp.cdcp.org.cn/nipisgd/static/file/mpeg/cover/ygjh.png",
                "date": "2023-07-04",
                "previewUrl": "https://ymapp.cdcp.org.cn/nipisgd/static/file/mpeg/firstpic/ygjh.png",
                "catalog": "0",
                "id": "40289f49891f9dec01891f9f6b160003",
                "viewCount": 10012,
                "source": "1",
                "title": "乙肝疫苗和脊灰疫苗",
                "contentType": "1",
                "content": "乙肝疫苗和脊灰疫苗",
                "seq": 9,
                "mpegUrl": "https://ymapp.cdcp.org.cn/nipisgd/static/file/mpeg/video/ygjh.mp4"
            },
            {
                "imgUrl": "https://ymapp.cdcp.org.cn/nipisgd/static/file/mpeg/cover/20230425.png",
                "date": "2023-07-04",
                "previewUrl": "https://ymapp.cdcp.org.cn/nipisgd/static/file/mpeg/firstpic/20230425.png",
                "catalog": "0",
                "id": "40289f49891f9dec01891f9e1dcf0001",
                "viewCount": 16849,
                "source": "1",
                "title": "2023年4.25预防接种日",
                "contentType": "1",
                "content": "2023年4.25预防接种日",
                "seq": 10,
                "mpegUrl": "https://ymapp.cdcp.org.cn/nipisgd/static/file/mpeg/video/20230425.mp4"
            },
            {
                "imgUrl": "https://ymapp.cdcp.org.cn/nipisgd/static/file/mpeg/cover/zzybfy.png",
                "date": "2023-07-04",
                "previewUrl": "https://ymapp.cdcp.org.cn/nipisgd/static/file/mpeg/firstpic/ymybfy.png",
                "catalog": "0",
                "id": "40289f49891f9dec01891f9fc50c0004",
                "viewCount": 7364,
                "source": "1",
                "title": "疫苗接种一般反应",
                "contentType": "1",
                "content": "疫苗接种一般反应",
                "seq": 11,
                "mpegUrl": "https://ymapp.cdcp.org.cn/nipisgd/static/file/mpeg/video/zjybfy.mp4"
            }
        ]

        if (!isEndPage.value) {
            uni.hideLoading();
            articleList.value = list
            // 不是最后一页
            pullScrollRef.value.success();
            if (articleList.value.length < pageSize.value) {
                isEndPage.value = true;
                // 如果是最后一页
                pullScrollRef.value.finish();
            }
        }
    }
    /** 点击 */
    const clickItem = (item) => {
        let url = ''

        url = '/pages/detail/detail?articleInfo=' +
            encodeURIComponent(JSON.stringify(item))

        uni.navigateTo({
            url: url
        })

    }

    // 下拉刷新
    const pullDown = () => {
        articleList.value = []
        pageNo.value = 1
        isEndPage.value = false

        setTimeout(() => {
            getArticleList();
            console.log('下一页');

        }, 300);
    }

    onReachBottom(() => {
        // 数据全部加载完
        if (!isEndPage.value) {
            // 显示加载中
            pullScrollRef.value.showUpLoading();
            pageNo.value++;
            getArticleList();
        }
    });

    onMounted(() => {
        uni.showLoading({
            title: '加载中...'
        });
        getArticleList()
    })
</script>

<template>
    <view class="page">
        <cc-pullScroolView class="pullScrollView" ref="pullScrollRef" :back-top="true" :pullDown="pullDown">
            <view class="home-article-list-container">
                <view class="home-article-list-container">
                    <view @click="clickItem(item)" class="home-article-list-item" v-for="(item, i) in articleList"
                        :key="i">
                        <view class="home-article-list-item-info">
                            <view class="home-article-list-item-info-title">
                                {{ item.title }}
                            </view>
                            <view class="home-article-list-item-info-time">{{
                                item.date
                                }}</view>
                        </view>
                        <view class="home-article-list-item-img">
                            <image class="home-article-list-item-pic" :src="item.imgUrl" alt="img" />
                        </view>
                    </view>
                </view>
            </view>
        </cc-pullScroolView>
    </view>
</template>

<style lang="scss" scoped>
    .page {
        position: relative;
        width: 100vw;
    }


    .home-article-list-container {
        width: 100%;
        padding: 0;

        .home-article-list-item {
            margin-top: 20rpx;
            background: #fff;
            border-radius: 12rpx;
            overflow: hidden;
            display: flex;
            flex-direction: row;
            padding: 32rpx;
            height: 160rpx;
            box-sizing: content-box;
            box-shadow: 0px 0px 10px 1px rgba(225, 234, 254, 0.69);

            &:nth-of-type(1) {
                margin-top: 0;
            }

            &:nth-last-of-type(1) {
                box-shadow: 10px 0px 10px 1px rgba(225, 234, 254, 0.69);
            }
        }

        .home-article-list-item-info {
            width: 70%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .home-article-list-item-info-title {
                width: 100%;
                padding-right: 32rpx;
                font-size: 28rpx;
                font-weight: bold;
                color: #666;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }

            .home-article-list-item-info-time {
                font-size: 24rpx;
                color: #999;


            }
        }

        .home-article-list-item-img {
            display: block;
            width: 240rpx;
            height: 160rpx;
            overflow: hidden;

            .home-article-list-item-pic {
                display: block;
                border-radius: 4rpx;
                width: 240rpx;
                height: 160rpx;
                object-fit: contain;
            }
        }
    }

    .scroll-Y {
        height: 667px;
    }

</style>
<route lang="json">{
    "layout": "home"
}</route>