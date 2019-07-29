<?php
session_start();
?>
<link rel="stylesheet" href="./css/qr_code.css">
<script>
var qr = window.qr = new QRious({
  element: document.querySelector('.qr-c-f-img > img'),
  size: 450,
  value: 'QRious'
});

</script>
<section class='window-qr_code'>
    <section class='qr-code-form'>
        <div class='qr-c-f-img'>
            <img src="" alt="">
        </div>
        <div class='qr-c-f-status'>
            <span class='spinner-loader q-c-spinner'></span>
            <p>AGUARDE</p>
        </div>
    </section>
</section>