/*
 * @Descripttion: 
 * @Author: gulingxin
 * @Date: 2021-02-02 20:38:10
 * @LastEditTime: 2021-02-03 11:45:15
 */
export const RecordHtml = `
<div class="record-wrap">
    <div id='recordContainer' class='record-container'>
        <div class='record-micro'>
            <div class='record-recording'></div>
            <div id="record" class='record-content'>
                <div class='record-microImg'>
                <svg t="1614657180620" class="icon" viewBox="0 0 1024 1024" 
                width="1em"
                height= "1em"
                fill="currentColor"><path d="M512.11377778 680.35318518c136.07822222 0 247.01155555-110.592 247.01155555-247.23911111V247.99762963C759.12533333 111.57807407 648.53333333 0.75851852 512.11377778 0.75851852 376.03555555 0.75851852 265.10222222 111.35051852 265.10222222 247.99762963V433.11407407c-0.11377778 136.41955555 110.47822222 247.23911111 247.01155556 247.23911111z m0 0" p-id="6853" fill="#ffffff"></path><path d="M542.83377778 802.43674074v-3.75466667c185.91288889-15.70133333 332.00355555-171.57688889 332.00355555-361.58577777 0-17.06666667-13.88088889-30.83377778-30.83377778-30.83377778-17.06666667 0-30.83377778 13.88088889-30.83377777 30.83377778 0 166.22933333-134.94044445 301.16977778-301.16977778 301.16977777S210.83022222 603.32562963 210.83022222 437.0962963c0-17.06666667-13.88088889-30.83377778-30.83377777-30.83377778-17.06666667 0-30.83377778 13.88088889-30.83377778 30.83377778 0 190.00888889 146.09066667 345.88444445 332.00355555 361.58577777v159.40266667H339.74044445c-17.06666667 0-30.83377778 13.88088889-30.83377778 30.83377778 0 17.06666667 13.88088889 30.83377778 30.83377778 30.83377778h344.86044444c17.06666667 0 30.83377778-13.76711111 30.83377778-30.83377778 0-17.06666667-13.88088889-30.83377778-30.83377778-30.83377778H543.06133333V802.43674074h-0.22755555z m0 0" p-id="6854" fill="#ffffff"></path></svg>
                </div>
            </div>
        </div>   
    </div>
    <div class='record-title'>点击图标开始录音</div>
    <div class='record-error'>未检测到录音设备，请确保录音设备正常</div>
    <div class='record-time'>
        <span id='recordUsetime' class='record-usedTime'>0'00"</span>/限<span id='recordDuration'>5'00"</span>
    </div>
</div>
`;

export const AudioHtml = `
<div class='record-audio-wrap'>
    <audio id='audio'></audio>
    <div class='record-audio-container'>
    </div>
    <div class='record-reRecord'>重录</div>
</div>
`;

export const NoData = `<div class='recorder-nodata'>
    <div class='recorder-top'>
        <div class='recorder-nodata-img'></div>
    </div>
    <div class='recorder-title'>
        <div>当前浏览器不支持录音</div>
        <div>请安装最新360浏览器并设置极速模式或安装谷歌浏览器</div>
    </div>
</div>`;
