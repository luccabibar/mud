<?php
session_start();
if(isset($_SESSION['id_usuario'])):
?>
<link rel="stylesheet" href="./css/qr_code.css">
<script>
    this.IniciarSessao();
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
<?php
else:
    ?>
    <script>muda_session('page','home.php')</script>
    <?php
endif;
 ?>