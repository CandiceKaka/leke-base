import './jquery-1.8.3.min';

window.jQuery = $;
import './mathquill';
import Sketchpad from './sketchpad';
import template from "./template";
import html2canvas from 'html2canvas';
import './index.less';
import css from './mathquill.css';

const cssString=css.toString();
const style=document.createElement('style');
style.innerHTML=cssString;
document.head.appendChild(style);

const config = {
    restrictMismatchedBrackets: true
};
export default class Formula {
    constructor(el) {
        el.innerHTML = template();
        // this.$root = $('#math');
        // this.root = this.$root[0];
        // const MQ = MathQuill.getInterface(2);
        // this.mathField = MQ.MathField(this.root, config);
        this.init();
    }
    latex(latex){
        if(latex===undefined){
            return this.mathField.latex();
        }
        return this.mathField.latex(latex);
    }
    init(){
        const iframe=this.iframe=document.createElement('iframe');
        $('#_formula_result').append(iframe);
        const doc=iframe.contentWindow.document;
        doc.write(`<style>body{margin:0;padding:0;}${css.toString()}</style>`);
        doc.write('<div id="math"></div>');
        doc.write(`
            <script>
                window.toDataURL=function(latex) {
                    var el=document.querySelector("#math .mq-root-block")
                    if(!latex||!el){
                        return Promise.resolve(null)
                    }
                    return window.html2canvas(el,{scale:1}).then(function (canvas) {
                        return canvas.toDataURL()
                    })
                }
            </script>
        `);
        const root=doc.getElementById('math');
        const MQ = MathQuill.getInterface(2);
        this.mathField = MQ.MathField(root, config);
        this.bindEvent();
    }
    toDataURL(){
        const latex=this.mathField.latex();
        const iframeWindow=this.iframe.contentWindow;
        if(!iframeWindow.html2canvas){
            iframeWindow.html2canvas=html2canvas;
        }
        return this.iframe.contentWindow.toDataURL(latex);
    }

    // toDataURL() {
    //     const latex = this.mathField.latex();
    //     const el = $('#math .mq-root-block')[0];
    //     if (!latex || !el) {
    //         return Promise.resolve(null);
    //     }
    //     const canvas = document.createElement("canvas");
    //     canvas.width=el.offsetWidth;
    //     canvas.height=el.offsetHeight;
    //     const cloneNode=this.root.cloneNode(true);
    //     cloneNode.style.width=this.root.clientWidth+'px';
    //     const context = canvas.getContext('2d');
    //     const html=`
    //         <style>body{margin:0;padding:0;}${cssString}</style>
    //         ${cloneNode.outerHTML}
    //     `;
    //     return rasterizeHTML.drawHTML(html).then(res=>{
    //         context.drawImage(res.image,el.offsetLeft,el.offsetTop,el.offsetWidth,el.offsetHeight,0,0,el.offsetWidth,el.offsetHeight);
    //         return canvas.toDataURL();
    //     });
    // }

    bindEvent() {
        let sketchpad = null;
        $(".tabTitle li").click(function () {
            const $el = $(this);
            if ($el.hasClass('current')) {
                return;
            }
            $el.addClass('current').siblings('.current').removeClass("current");
            const index = $el.index();
            $(".tabContent>div").eq(index).show().siblings().hide();
            if (index === 1) {
                $('.create-box').show();
                if (sketchpad) {
                    sketchpad.clearAll();
                } else {
                    sketchpad = new Sketchpad({
                        element: document.getElementById('canvas')
                    });
                    sketchpad.watch(function (o) {
                        if (o.strokes.length > 0) {
                            $('.undo').removeClass('disabled');
                        } else {
                            $('.undo').addClass('disabled');
                        }
                        if (o.undoHistory.length > 0) {
                            $('.redo').removeClass('disabled');
                        } else {
                            $('.redo').addClass('disabled');
                        }
                    });
                }
            } else {
                $('.create-box').hide();
            }
        });
        $('.undo').click(function () {
            if (sketchpad && sketchpad.strokes.length > 0) {
                sketchpad.undo();
            }
        });
        $('.redo').click(function () {
            if (sketchpad && sketchpad.undoHistory.length > 0) {
                sketchpad.redo();
            }
        });
        $('.clear').click(function () {
            const $imgPreview = $('.img-preview');
            if ($imgPreview.is(':visible')) {
                const $input = $('<input id="upload-btn" type="file" style="visibility: hidden"/>').change(fileChange);
                $('#upload-btn').replaceWith($input);
                $imgPreview.html('').hide();
            } else if (sketchpad) {
                sketchpad.clear();
            }
        });

        function fileChange(e) {
            const fr = new FileReader();
            fr.onloadend = function (e) {
                sketchpad.clearAll();
                const $img = $('<img />').attr('src', e.target.result).css('max-width', sketchpad.canvas.width + 'px').css('max-height', sketchpad.canvas.height + 'px');
                $('.img-preview').show().append($img);
            };
            fr.readAsDataURL(e.target.files[0]);
        }

        $('#upload-btn').change(fileChange);
        $('.preview-btn').click(() => {
            const $img = $('.img-preview img');
            let base64;
            if ($img.is(':visible')) {
                base64 = $img.attr('src');
            } else if (sketchpad) {
                base64 = sketchpad.canvas.toDataURL("image/jpeg");
            }
            $.ajax({
                type: 'post',
                url: 'https://api.mathpix.com/v3/latex',
                headers: {
                    'Content-Type': 'application/json',
                    "app_id": "hzchenshan_163_com_eae19e",
                    "app_key": "c5d460e76bb35dd931e7"
                },
                data: JSON.stringify({
                    "src": base64,
                    "formats": ['latex_styled'],
                    "data_options": {
                        "include_latex": true
                    }
                }),
                success: (res) => {
                    const latex = res.latex_styled;
                    if (latex) {
                        this.mathField.latex(latex);
                    }
                }
            });
        });
        $('.math-template').on('click', 'li', (e) => {
            const latex = e.target.getAttribute('data-latex').replace("{/}", "\\");
            this.mathField.write(latex);
        }).mousedown(function (e) {
            e.preventDefault();
        });
    }
}