<header class="cabecalho">
    <h1>
        <img src="img\mud_logo.svg" alt="" srcset="" class="logo">
    </h1>
    
    <button class="btn-nav-show" onclick="nav_show()" onmouseover="onmouseover_color('.btn-nav-show > i','#165044ff')" onmouseout= "onmouseout_color('.btn-nav-show > i','rgb(38, 187, 157)')">
        <i class="fas fa-align-justify"></i>        
    </button>
    
    <nav class="lista-cabecalho">
        <ul class="menu_ul_top nav_internal_top">
            <li><button class="btn-basic btn-nav-close" onclick="nav_close()" onmouseover="onmouseover_color('.btn-nav-close > i','#165044ff')" onmouseout= "onmouseout_color('.btn-nav-close > i','rgb(38, 187, 157)')"><i class="fas fa-chevron-right"></i></button></li>
        </ul>
        <ul class="menu_ul_bottom flex_column nav_internal_buttom">
            <li><a href="#" onclick="muda_session('page','home.php')"><i class="fas fa-home"></i>HOME</a></li>
            <li><a href="#" onclick="muda_session('page','sobre_nos.php')"><i class="fas fa-code"></i>QUEM SOMOS</a></li>
            <li><a href="#" onclick="muda_session('page','especialista.php')"><i class="fas fa-brain"></i>ESPECIALISTA</a></li>
        </ul>
        
    </nav>
</header>
<div class="corrige"></div>
