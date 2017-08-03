// import axios from 'axios';
import $ from 'jquery';
export default {
    data() {
        return {
            sideList: [{
                name: "推荐"
            }, {
                name: "热点"
            }, {
                name: "视频"
            }, {
                name: "图片"
            }, {
                name: "段子"
            }, {
                name: "社会"
            }, {
                name: "娱乐"
            }, {
                name: "科技"
            }, {
                name: "体育"
            }, {
                name: "汽车"
            }, {
                name: "财经"
            }, {
                name: "搞笑"
            }, {
                name: "更多"
            }],
            topBanners: [],
            topBanner: '',
            newsLists: [],
            lazy: 0,
        };
    },
    watch: {
        lazy() {
            if(this.lazy === 1) {
                this.getNewsList();
            }else {

            }
        }
    },
    methods: {
        lazyLoad() {
            let me = this;
            $(window).scroll(function() {
                if($(document).scrollTop()+$(window).height()+50>$(document).height()) {
                    me.lazy = 1;
                }else {
                    me.lazy = 0;
                }
            });
        },
        getNewsList() {
            let me = this;
            $.ajax({
                dataType: "jsonp",
                url: "https://www.toutiao.com/api/pc/feed/?min_behot_time=0&category=__all__&utm_source=toutiao&widen=1&tadrequire=true&as=A12519F7C000D95&cp=5970509DC9458E1",
                data: {},
                success: function(data) {
                    console.log(data)
                    for(let i = 0; i < data.data.length; i++) {
                        me.newsLists.push({
                            image_url: data.data[i].image_url,
                            media_avatar_url: data.data[i].media_avatar_url,
                            title: data.data[i].title,
                            tag: data.data[i].chinese_tag,
                            source: data.data[i].source,
                            comments: data.data[i].comments_count,
                        })
                    }
                }
            })
        },
        focusShow () {
            let me = this;
            var j = 1;
            imageShow(0);
            setInterval(function(){
                if(j === 6) {
                    j = 0;
                    imageShow(0);
                }else {
                    imageShow(j);
                    console.log(j);
                    j++;
                }
            },2000);
            function imageShow (item) {
                // console.log(me.topBanners.length)
                for(let i = 0; i < me.topBanners.length; i++) {
                    if (item === i) {
                        me.topBanners[i].class = "displayBlock";
                        // animate(imageBanner[i],{opacity:1});
                        // pic[i].style.borderColor = "rgba(0,0,0,0.4)";
                        // pic[i].style.backgroundColor = "rgba(255,255,255,0.4)";
                    }else {
                        me.topBanners[i].class = "displayNone";
                        // animate(imageBanner[i],{opacity:0});
                        // pic[i].style.borderColor = "rgba(255,255,255,0.3)";
                        // pic[i].style.backgroundColor = "rgba(0,0,0,0.4)";
                    }
                }
            }    
        }
    },
    created() {
        this.getNewsList();
        var me = this;
        //获取天气
        $.ajax({
            type : 'get',
            dataType : 'jsonp',
            url: 'https://www.toutiao.com/stream/widget/local_weather/data/?city=%E5%8C%97%E4%BA%AC',
            data : {},
            success : function(result) {
                // console.log(result);
            }
        })
        $.ajax({
            type : 'get',
            dataType : 'jsonp',
            url: 'http://www.toutiao.com/api/pc/focus/',
            data : {},
            async: false,
            success : function(data) {
                var focus = data.data.pc_feed_focus;
                for (let i = 0; i < focus.length; i++) {
                    if(i < 6) {
                        me.topBanners.push({
                            image_url: focus[i].image_url,
                            title: focus[i].title,
                            class: 'displayNone',
                        })
                    }
                }
                me.focusShow();
            }
           
        })
        me.lazyLoad();
    }
}