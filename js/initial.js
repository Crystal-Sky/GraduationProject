/**
 * Created by 云雪 on 2017/12/25.
 */
var renderer;/*渲染器*/
var scene;/*场景*/
var camera;/*相机*/
var light;/*灯光*/
var container;/*场景容器*/
var controls;/*实现旋转、缩放事件的控制器*/
var Width;/*显示宽度*/
var Height;/*显示高度*/
var bigThing;/*沙滩小岛*/
var Tree;/*单棵椰子树*/
var Coconut;/*椰子果实*/
var mouseX=0;/*鼠标点击X坐标*/
var mouseY=0;/*鼠标点击Y坐标*/
var rayCaster;/*射线投射器对象*/
var ray;/*射线投射方向单位向量(worldVector坐标减相机位置坐标)*/
var plantTip;/*种植提示框*/
var wrap;/*遮罩层*/
var plantY;/*确定种植*/
var plantN;/*不种植*/
var Msgs;/*所有资料的父容器*/
var Cgroup;/*资料数组*/
var Menus;/*底部菜单栏*/
var Prev;/*上一张资料*/
var Next;/*下一张资料*/
var index;/*当前资料索引*/
var arrs;/*旋转角度数组*/
var MX1;/*鼠标点击资料位置X*/
var MY1;/*鼠标点击资料位置Y*/
var MX2;/*鼠标点击资料后移动位置X*/
var sceneThings;/*小岛各个元素的name*/
var smallTip;/*点击提示圈圈*/
var clickPlant;/*点击种植*/
var plantContent;/*种植按钮容器*/
var sumPalm;/*收获椰子数量*/
var sub1;/*圈圈提示点击按钮下一步*/
var sub2;/*圈圈提示点击按钮完成*/
var tip1;/*圈圈提示点击按钮文字*/
var tip2;/*圈圈提示点击按钮文字*/
var plantTrees;/*种植椰子树模型数组*/
var plantFruits;/*椰子模型数组*/
var TreesNumber;/*种植椰子树数量*/
var dayTip;/*种树后提示*/
var tipNum;/*是否显示操作指引依据*/
var mouse;/*标准坐标{x,y}值*/
var standardVector;/*标准设备坐标{x,y,z}*/
var worldVector;/*世界坐标{x,y,z}*/
var sumNumber;/*椰子数量*/
var oneThing;
var close;
var things;
var touchTree;
var touchFruit;
var contentAll;
var close2;
var MainObject;
var FinishLoading;
var loading;
var scale;
/*初始化场景容器*/
function initial() {
    /*初始化*/
    Menus=new Array();/*菜单数组*/
    Cgroup=new Array();/*资料卡片数组*/
    plantTrees=new Array();/*种植椰子树模型数组*/
    plantFruits=new Array();/*椰子模型数组*/
    things=new Array();
    sumNumber=0;/*椰子数量*/
    index=3;/*资料卡片当前索引*/
    tipNum=0;/*是否显示操作指引依据*/
    TreesNumber=0;/*种植椰子树数量*/
    arrs=new Array(1,2,3,4,5);/*资料卡片顺序数组*/
    sceneThings=new Array('Terrain_Terrain_1','island_mesh01_1','island_mesh01_2','island_mesh01_3','island_mesh01_4','island_mesh01_5','AM130_011_001','ObjArch31_001');/*bigThing中模型name*/
    /*沙滩，小草，椰树皮，椰树叶子，大草，石头,椰子，单个椰子树皮*/
    Width=window.innerWidth;/*获取屏幕宽度*/
    Height=window.innerHeight;/*获取屏幕高度*/
    /*获取HTML元素*/
    plantTip=document.getElementById("plantTip");/*是否种植提示对话框*/
    wrap=document.getElementById("wrap");/*遮罩层*/
    plantY=document.getElementById("plantY");/*种植对话框中‘是’的按钮*/
    plantN=document.getElementById("plantN");/*种植对话框中‘否’的按钮*/
    loading=document.getElementById('loading');/*加载圈圈*/
    Msgs=document.getElementById('Msgs');/*资料卡片父容器*/
    smallTip=document.getElementById('smallTip');/*点击提示圈圈*/
    Prev=document.getElementById('Prev');/*上一张资料*/
    Next=document.getElementById('Next');/*下一张资料*/
    clickPlant=document.getElementById('clickPlant');/*种植按钮*/
    plantContent=document.getElementById('plantContent');/*种植按钮容器*/
    sumPalm=document.getElementById('sum');/*收获椰子数量*/
    dayTip=document.getElementById('dayTip');/*种树后提示*/
    sub1=document.getElementById('sub1');/*圈圈提示点击按钮下一步*/
    sub2=document.getElementById('sub2');/*圈圈提示点击按钮完成*/
    tip1=document.getElementById('tip1');/*圈圈提示点击按钮文字*/
    tip2=document.getElementById('tip2');/*圈圈提示点击按钮文字*/
    close=document.getElementById('close');
    oneThing=document.getElementById('oneThing');
    touchTree=document.getElementById('touchTree');
    touchFruit=document.getElementById('touchFruit');
    contentAll=document.getElementById('contentAll');
    close2=document.getElementById('close2');
    things[0]=document.getElementById('thing1');
    things[1]=document.getElementById('thing2');
    things[2]=document.getElementById('thing3');
    things[3]=document.getElementById('thing4');
    things[4]=document.getElementById('thing5');
    /*资料卡片数组*/
    Cgroup[1]=document.getElementById('Cone');
    Cgroup[2]=document.getElementById('Ctwo');
    Cgroup[3]=document.getElementById('Cthree');
    Cgroup[4]=document.getElementById('Cfour');
    Cgroup[5]=document.getElementById('Cfive');
    /*底部菜单数组*/
    Menus[1]=document.getElementById('menu1');
    Menus[2]=document.getElementById('menu2');
    Menus[3]=document.getElementById('menu3');
    Menus[4]=document.getElementById('menu4');
    /*修改HTML元素的style*/
    plantTip.style.display="none";
    Msgs.style.display="none";
    /*创建div容器容纳场景*/
    container = document.createElement( 'div' );
    container.style.cursor='pointer';
    document.body.appendChild( container );
}
/*初始化渲染器*/
function initRenderer(){
    /*初始化渲染器*/
    renderer=new THREE.WebGLRenderer();
    renderer.setSize(Width,Height);/*设置渲染器大小*/
    container.appendChild(renderer.domElement);
    renderer.setClearColor(0xeeeeee, 1.0);/*设置渲染器背景颜色*/
}
/*初始化相机*/
function initCamera(){
    camera=new THREE.PerspectiveCamera(45, Width / Height, 1, 2000);
    /*
    *   PerspectiveCamera：透视相机
    *   45：相机视椎体垂直视角fov,从下到上的观察角度，为0时什么也看不见
    *   width/height：相机视椎体宽高比aspect，通俗来说就是屏幕宽高比
    *   1：相机视椎体近裁剪面
    *   10000：相机视椎体远裁剪面
    * */
    /*相机放置的位置，基于三维空间的x,y,z值*/
    camera.position.x=-460;
    camera.position.y=400;
    camera.position.z=700;
    /*相机以哪个方向为上方*/
    camera.up.x=0;
    camera.up.y=1;
    camera.up.z=0;
    /*相机看向哪个点*/
    camera.lookAt({
        x:0,
        y:0,
        z:0
    });
    /*初始化控制器*/
    controls = new THREE.TrackballControls( camera );
    /*旋转速度*/
    controls.rotateSpeed = 1.0;
    /*变焦速度[即缩放速度]*/
    controls.zoomSpeed = 1.2;
    /*平移速度[与右键相关，可关闭]*/
    controls.panSpeed = 0.8;
    /*是否不变焦[即是否不缩放]*/
    controls.noZoom = false;
    /*是否不平移*/
    controls.noPan = true;
    /*是否开启移动惯性*/
    controls.staticMoving = true;
    /*动态阻尼系数，就是灵敏度*/
    controls.dynamicDampingFactor = 0.3;
}
/*初始化场景*/
function initScene() {
    scene=new THREE.Scene();
}
/*初始化灯光*/
function initLight(){
    var ambientLight = new THREE.AmbientLight( 0xffffff, 1);
    scene.add( ambientLight );
    var pointLight = new THREE.PointLight( 0xffffff, 1 );
    camera.add( pointLight );
}
/*添加3D场景*/
function initObject(){
    var mtlLoader=new THREE.MTLLoader();
    mtlLoader.setPath('model/Island/');
    mtlLoader.load('Island.mtl', function( materials ) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.setPath( 'model/Island/' );
        objLoader.load( 'Island.obj', function ( object ) {
            bigThing=object;
            /*修改模型的规模*/
            object.scale.x =object.scale.y =object.scale.z = 1.2;
            scene.add( object );
            plantContent.style.display='block';
        });
    });
}
/*初始化事件*/
function initEvent(){
    Menus[1].addEventListener('click',onClickGrow,false);
    Menus[2].addEventListener('click',onClickPalm,false);
    Menus[3].addEventListener('click',onClickFruit,false);
    Menus[4].addEventListener('click',onClickContent,false);
    clickPlant.addEventListener('click',onClickPlant,false);
    sub1.addEventListener('click',onTipNext,false);
    sub2.addEventListener('click',onTipFinish,false);
    Prev.addEventListener('click',onPrev,false);
    Next.addEventListener('click',onNext,false);
    close.addEventListener('click',function () {
        oneThing.style.display='none';
    },false);
    close2.addEventListener('click',function () {
        contentAll.style.display='none';
        /*暂时关闭控制器*/
        /*旋转速度*/
        controls.rotateSpeed = 1;
        /*是否不变焦[即是否不缩放]*/
        controls.noZoom = false;
    },false);
    for(var i=1;i<6;i++)
        Cgroup[i].addEventListener('mousedown',switchDown,false);
    plantY.addEventListener('click',onClickPlantY,false);
    plantN.addEventListener('click',onClickPlantN,false);
    /*监听设备屏幕大小*/
    window.addEventListener( 'resize', onWindowResize, false );
    renderer.domElement.addEventListener("mousedown",oneEvent1,false);
}
function oneEvent1(event){
    mouseX=event.clientX;
    mouseY=event.clientY;
    renderer.domElement.addEventListener("mouseup",oneEvent2,false);
}
function oneEvent2(event) {
    if(event.button==0&&mouseX==event.clientX&&mouseY==event.clientY)
    {
        renderer.domElement.removeEventListener("mouseup",oneEvent2,false);
        var m=new THREE.Vector2();
        //屏幕坐标转标准设备坐标
        m.x=(event.clientX/window.innerWidth)*2-1;//标准设备横坐标
        m.y=-(event.clientY/window.innerHeight)*2+1;//标准设备纵坐标
        standardVector  = new THREE.Vector3(m.x, m.y, 0.5);//标准设备坐标
        //标准设备坐标转世界坐标
        worldVector = standardVector.unproject(camera);
        //射线投射方向单位向量(worldVector坐标减相机位置坐标)
        var Ray = worldVector.sub(camera.position).normalize();
        //创建射线投射器对象
        var RayCaster = new THREE.Raycaster();
        RayCaster.setFromCamera(m,camera);
        //返回射线选中的对象
        var intersects = RayCaster.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
            /*收获果实*/
            if(sumNumber>0&&intersects[0].object.name==sceneThings[6]){
                plantFruits[sumNumber-1].visible=false;
                sumPalm.innerHTML=sumNumber;
            }
            if(bigThing!=undefined){
                if(intersects[0].object.name==sceneThings[0]){
                    for(var i=0;i<things.length;i++)
                        things[i].style.display='none';
                    oneThing.style.display='block';
                    oneThing.style.top=(innerHeight/2-15)+'px';
                    oneThing.style.left=(innerWidth/2-140)+'px';
                    things[0].style.display='block';
                }
                if(intersects[0].object.name==sceneThings[1]||intersects[0].object.name==sceneThings[4]){
                    for(var i=0;i<things.length;i++)
                        things[i].style.display='none';
                    oneThing.style.display='block';
                    oneThing.style.top=(innerHeight/2-30)+'px';
                    oneThing.style.left=(innerWidth/2-140)+'px';
                    things[3].style.display='block';
                }
                if(intersects[0].object.name==sceneThings[2]){
                    for(var i=0;i<things.length;i++)
                        things[i].style.display='none';
                    oneThing.style.display='block';
                    oneThing.style.top=(innerHeight/2-30)+'px';
                    oneThing.style.left=(innerWidth/2-140)+'px';
                    things[1].style.display='block';
                }
                if(intersects[0].object.name==sceneThings[3]){
                    for(var i=0;i<things.length;i++)
                        things[i].style.display='none';
                    oneThing.style.display='block';
                    oneThing.style.top=(innerHeight/2-45)+'px';
                    oneThing.style.left=(innerWidth/2-140)+'px';
                    things[2].style.display='block';
                }
                if(intersects[0].object.name==sceneThings[5]){
                    for(var i=0;i<things.length;i++)
                        things[i].style.display='none';
                    oneThing.style.display='block';
                    oneThing.style.top=(innerHeight/2-15)+'px';
                    oneThing.style.left=(innerWidth/2-140)+'px';
                    things[4].style.display='block';
                }
            }
            if(Tree!=undefined){
                /*暂时关闭控制器*/
                /*旋转速度*/
                controls.rotateSpeed = 0;
                /*是否不变焦[即是否不缩放]*/
                controls.noZoom = true;
                contentAll.style.top=(innerHeight/2-160)+'px';
                contentAll.style.left=(innerWidth/2-200)+'px';
                touchTree.style.display='block';
                touchFruit.style.display='none';
                contentAll.style.display='block';
            }
            if(Coconut!=undefined){
                /*暂时关闭控制器*/
                /*旋转速度*/
                controls.rotateSpeed = 0;
                /*是否不变焦[即是否不缩放]*/
                controls.noZoom = true;
                contentAll.style.top=(innerHeight/2-160)+'px';
                contentAll.style.left=(innerWidth/2-200)+'px';
                touchTree.style.display='none';
                touchFruit.style.display='block';
                contentAll.style.display='block';
            }
        }
    }
}
function onTipNext() {
    sub1.style.display='none';
    sub2.style.display='block';
    tip1.style.display='none';
    tip2.style.display='block';
}
function onTipFinish() {
    smallTip.style.display='none';
    wrap.style.display='none';
    sub1.style.display='block';
    sub2.style.display='none';
    tip1.style.display='block';
    tip2.style.display='none';
    /*开启控制器*/
    /*旋转速度*/
    controls.rotateSpeed = 1.0;
    /*是否不变焦[即是否不缩放]*/
    controls.noZoom = false;
    renderer.domElement.removeEventListener("mousedown",oneEvent1,false);
    /*监听鼠标按下来事件*/
    renderer.domElement.addEventListener("mousedown",onDocumentMouseDown,false);
}
function onClickPlant() {
    /*暂时关闭控制器*/
    /*旋转速度*/
    controls.rotateSpeed = 0;
    /*是否不变焦[即是否不缩放]*/
    controls.noZoom = true;
    var x=window.innerWidth/2-151;
    var y=window.innerHeight/2-121;
    plantTip.style.marginLeft=x+"px";
    plantTip.style.marginTop=y+"px";
    wrap.style.display="block";
    plantTip.style.display="block";
}
/*种植对话框按钮点击事件：是&否*/
function onClickPlantY(event) {
    if(tipNum==0){
        setPos(window.innerWidth/2,2*window.innerHeight/3);
        tipNum=tipNum+1;
    }else{
        wrap.style.display="none";
        /*开启控制器*/
        /*旋转速度*/
        controls.rotateSpeed = 1.0;
        /*是否不变焦[即是否不缩放]*/
        controls.noZoom = false;
        renderer.domElement.removeEventListener("mousedown",oneEvent1,false);
        /*监听鼠标按下来事件*/
        renderer.domElement.addEventListener("mousedown",onDocumentMouseDown,false);
    }
    plantTip.style.display="none";
}
function onClickPlantN(event) {
    /*开启控制器*/
    /*旋转速度*/
    controls.rotateSpeed = 1.0;
    /*是否不变焦[即是否不缩放]*/
    controls.noZoom = false;
    wrap.style.display="none";
    plantTip.style.display="none";
}
/*设置提示圈圈位置*/
function setPos(X,Y){
    /*暂时关闭控制器*/
    /*旋转速度*/
    controls.rotateSpeed = 0;
    /*是否不变焦[即是否不缩放]*/
    controls.noZoom = true;
    var clientX=X-50;
    var clientY=Y-50;
    smallTip.style.top=clientY+'px';
    smallTip.style.left=clientX+'px';
    wrap.style.display='block';
    smallTip.style.zIndex='10000';
    smallTip.style.display='block';
}
function onDocumentMouseDown(event) {
    mouseX=event.clientX;
    mouseY=event.clientY;
    renderer.domElement.addEventListener("mouseup",onDocumentMouseUp,false);
}
function onDocumentMouseUp(event) {
    if(event.button==0&&mouseX==event.clientX&&mouseY==event.clientY)
    {
        PlantGrow(event.clientX,event.clientY);
    }
}
function PlantGrow(X,Y) {
    var m=new THREE.Vector2();
    m.x=(X/window.innerWidth)*2-1;//标准设备横坐标
    m.y=-(Y/window.innerHeight)*2+1;//标准设备纵坐标
    var position=getWorldCoordinate(X,Y);
    //射线投射方向单位向量(worldVector坐标减相机位置坐标)
    ray = position.sub(camera.position).normalize();
    //创建射线投射器对象
    rayCaster = new THREE.Raycaster();
    rayCaster.setFromCamera(m,camera);
    //返回射线选中的对象
    var intersects = rayCaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        if(intersects[0].object.name==sceneThings[0]){
            renderer.domElement.removeEventListener("mousedown",onDocumentMouseDown,false);
            renderer.domElement.removeEventListener("mouseup",onDocumentMouseUp,false);
            var mtlLoader2=new THREE.MTLLoader();
            mtlLoader2.setPath('model/Tree/');
            mtlLoader2.load('tree.mtl', function( materials ) {
                materials.preload();
                var objLoader2 = new THREE.OBJLoader();
                objLoader2.setMaterials( materials );
                objLoader2.setPath( 'model/Tree/' );
                objLoader2.load( 'tree.obj', function ( object ) {
                    object.position.x=intersects[0].point.x;
                    object.position.y =intersects[0].point.y;
                    object.position.z=intersects[0].point.z;
                    object.scale.x =  object.scale.y =  object.scale.z = 0.001;
                    plantTrees[TreesNumber]=object;
                    TreesNumber=TreesNumber+1;
                    scale=object.scale.x+0.001;
                    scene.add( object );
                });
            });
            /*萌芽期*/
            setTimeout(function () {
               scale=0.1;
            },1000);
            /*幼苗期*/
            setTimeout(function () {
                scale=0.3;
            },3000);
            /*幼树期*/
            setTimeout(function () {
                scale=0.5;
            },5000);
            /*初产期*/
            setTimeout(function () {
                scale=0.8;
            },7000);
            setTimeout(function () {
                var mtlLoader3=new THREE.MTLLoader();
                mtlLoader3.setPath('model/coconut/');
                mtlLoader3.load('coconut.mtl', function( materials ) {
                    materials.preload();
                    var objLoader3 = new THREE.OBJLoader();
                    objLoader3.setMaterials( materials );
                    objLoader3.setPath( 'model/coconut/' );
                    objLoader3.load( 'coconut.obj', function ( object ) {
                        object.position.x=intersects[0].point.x;
                        object.position.y =intersects[0].point.y+200;/**/
                        object.position.z=intersects[0].point.z;
                        object.scale.x =  object.scale.y =  object.scale.z = 0;
                        plantFruits[sumNumber]=object;
                        sumNumber=sumNumber+1;
                        scene.add( object );
                    });
                });
            },14000);
            renderer.domElement.addEventListener("mousedown",oneEvent1,false);
        }
    }
}
/*切换小岛场景*/
function onClickGrow() {
    camera.up.x=0;
    camera.up.y=1;
    camera.up.z=0;
    camera.position.x=-460;
    camera.position.y=400;
    camera.position.z=700;
    camera.lookAt({
        x:0,
        y:0,
        z:0
    });
    plantContent.style.display='block';
    Menus[1].className='column col';
    if(Tree!=undefined) {
        scene.remove(Tree);
        Menus[2].className='column';
        Tree=undefined;
    }
    if(Coconut!=undefined) {
        scene.remove(Coconut);
        Menus[3].className='column';
        Coconut=undefined;
    }
    var mtlLoader=new THREE.MTLLoader();
    mtlLoader.setPath('model/Island/');
    mtlLoader.load('Island.mtl', function( materials ) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.setPath( 'model/Island/' );
        objLoader.load( 'Island.obj', function ( object ) {
            bigThing=object;
            /*修改模型的规模*/
            object.scale.x =1.2;
            object.scale.y =1.2;
            object.scale.z = 1.2;
            scene.add( object );
            plantContent.style.display='block';
        });
    });
}
/*切换椰子树场景*/
function onClickPalm() {
    camera.up.x=0;
    camera.up.y=1;
    camera.up.z=0;
    camera.position.x=-460;
    camera.position.y=400;
    camera.position.z=700;
    camera.lookAt({
        x:0,
        y:0,
        z:0
    });
    Menus[2].className='column col';
    if(bigThing!=undefined) {
        Menus[1].className='column';
        scene.remove(bigThing);
        plantContent.style.display='none';
        bigThing=undefined;
    }
    if(Coconut!=undefined) {
        Menus[3].className='column';
        scene.remove(Coconut);
        Coconut=undefined;
    }
    if(TreesNumber>0){
        for(var i=0,length=plantTrees.length;i<length;i++){
            scene.remove(plantTrees[i]);
        }
        plantTrees.length=0;
        TreesNumber=0;
    }
    if(sumNumber>0){
        for(var i=0,length=plantFruits.length;i<length;i++){
            scene.remove(plantFruits[i]);
        }
        plantFruits.length=0;
        sumNumber=0;
    }
    var mtlLoader2=new THREE.MTLLoader();
    mtlLoader2.setPath('model/Tree/');
    mtlLoader2.load('tree.mtl', function( materials ) {
        materials.preload();
        var objLoader2 = new THREE.OBJLoader();
        objLoader2.setMaterials( materials );
        objLoader2.setPath( 'model/Tree/' );
        objLoader2.load( 'tree.obj', function ( object ) {
            object.position.y =-180;
            object.scale.x =  object.scale.y =  object.scale.z = 1.5;
            Tree=object;
            scene.add( object );
        });
    });
}
/*切换椰子果实场景*/
function onClickFruit() {
    camera.up.x=0;
    camera.up.y=1;
    camera.up.z=0;
    camera.position.x=-460;
    camera.position.y=400;
    camera.position.z=700;
    camera.lookAt({
        x:0,
        y:0,
        z:0
    });
    plantContent.style.display='none';
    Menus[3].className='column col';
    if(bigThing!=undefined) {
        Menus[1].className='column';
        scene.remove(bigThing);
        bigThing=undefined;
    }
    if(Tree!=undefined) {
        Menus[2].className='column';
        scene.remove(Tree);
        Tree=undefined;
    }
    if(TreesNumber>0){
        for(var i=0,length=plantTrees.length;i<length;i++){
            scene.remove(plantTrees[i]);
        }
        plantTrees.length=0;
        TreesNumber=0;
    }
    if(sumNumber>0){
        for(var i=0,length=plantFruits.length;i<length;i++){
            scene.remove(plantFruits[i]);
        }
        plantFruits.length=0;
        sumNumber=0;
    }
    var mtlLoader3=new THREE.MTLLoader();
    mtlLoader3.setPath('model/coconut/');
    mtlLoader3.load('coconut.mtl', function( materials ) {
        materials.preload();
        var objLoader3 = new THREE.OBJLoader();
        objLoader3.setMaterials( materials );
        objLoader3.setPath( 'model/coconut/' );
        objLoader3.load( 'coconut.obj', function ( object ) {
            Coconut=object;
            object.scale.x =  object.scale.y =  object.scale.z = 1.5;
            scene.add( object );
        });
    });
}
/*弹出收起资料卡片*/
function onClickContent() {
    /*暂时关闭控制器*/
    /*旋转速度*/
    controls.rotateSpeed = 0;
    /*是否不变焦[即是否不缩放]*/
    controls.noZoom = true;
    var w=window.innerWidth/2-350;
    var h=window.innerHeight/2-250;
    Msgs.style.top=h+'px';
    Msgs.style.left=w+'px';
    Msgs.style.display="block";
    Menus[4].className='column col';
    Menus[4].removeEventListener('click',onClickContent,false);
    Menus[4].addEventListener('click',onClickNoContent,false);
}
function onClickNoContent() {
    /*重新开启控制器*/
    /*旋转速度*/
    controls.rotateSpeed = 1;
    /*是否不变焦[即是否不缩放]*/
    controls.noZoom = false;
    Msgs.style.display="none";
    Menus[4].className='column';
    Menus[4].removeEventListener('click',onClickNoContent,false);
    Menus[4].addEventListener('click',onClickContent,false);
}
/*鼠标移动资料*/
function switchDown(event) {
    MX1=event.clientX;
    MY1=event.clientY;
    var clickIndex = parseInt(this.getAttribute('index'));
    Cgroup[clickIndex].addEventListener('mousemove',switchMove,false);
    Cgroup[clickIndex].addEventListener('mouseup',function (e) {
        if(e.clientX==MX1&&e.clientY==MY1){
            Cgroup[clickIndex].removeEventListener('mousemove',switchMove,false);
        }
    },false);
}
function switchMove(event) {
    MX2=event.clientX;
    var clickIndex=parseInt(this.getAttribute('index'));
    if(MX2-MX1>0){
        Cgroup[clickIndex].style.zIndex=2;
        if(clickIndex==1){
            index=6;
        }
        index=index-1;
        Cgroup[index].style.zIndex=3;
        var x=arrs.pop();
        arrs.unshift(x);
        Cgroup[arrs[0]].style.transform='rotate(-6deg)';
        Cgroup[arrs[1]].style.transform='rotate(-3deg)';
        Cgroup[arrs[2]].style.transform='rotate(0deg)';
        Cgroup[arrs[3]].style.transform='rotate(3deg)';
        Cgroup[arrs[4]].style.transform='rotate(6deg)';
        Cgroup[clickIndex].removeEventListener('mousemove',switchMove,false);
    }else{
        Cgroup[clickIndex].style.zIndex=2;
        if(clickIndex==5){
            index=0;
        }
        index=index+1;
        Cgroup[index].style.zIndex=3;
        var x=arrs.shift();
        arrs.push(x);
        Cgroup[arrs[0]].style.transform='rotate(-6deg)';
        Cgroup[arrs[1]].style.transform='rotate(-3deg)';
        Cgroup[arrs[2]].style.transform='rotate(0deg)';
        Cgroup[arrs[3]].style.transform='rotate(3deg)';
        Cgroup[arrs[4]].style.transform='rotate(6deg)';
        Cgroup[clickIndex].removeEventListener('mousemove',switchMove,false);
    }
}
/*上一张资料*/
function onPrev() {
    Cgroup[index].style.zIndex=2;
    if(index==1)
        index=6;
    index=index-1;
    Cgroup[index].style.zIndex=3;
    var x=arrs.pop();
    arrs.unshift(x);
    Cgroup[arrs[0]].style.transform='rotate(-6deg)';
    Cgroup[arrs[1]].style.transform='rotate(-3deg)';
    Cgroup[arrs[2]].style.transform='rotate(0deg)';
    Cgroup[arrs[3]].style.transform='rotate(3deg)';
    Cgroup[arrs[4]].style.transform='rotate(6deg)';
}
/*下一张资料*/
function onNext() {
    Cgroup[index].style.zIndex=2;
    if(index==5){
        index=0;
    }
    index=index+1;
    Cgroup[index].style.zIndex=3;
    var x=arrs.shift();
    arrs.push(x);
    Cgroup[arrs[0]].style.transform='rotate(-6deg)';
    Cgroup[arrs[1]].style.transform='rotate(-3deg)';
    Cgroup[arrs[2]].style.transform='rotate(0deg)';
    Cgroup[arrs[3]].style.transform='rotate(3deg)';
    Cgroup[arrs[4]].style.transform='rotate(6deg)';
}
/*屏幕坐标转世界坐标*/
function  getWorldCoordinate(X,Y) {
    /* X:鼠标点击位置横坐标 Y:鼠标点击位置纵坐标 */
    //屏幕坐标转标准设备坐标
    var x = ( X / window.innerWidth ) * 2 - 1;//标准设备横坐标
    var y = -( Y / window.innerHeight ) * 2 + 1;//标准设备纵坐标
    var standardVector  = new THREE.Vector3(x, y, 0.5);//标准设备坐标
    //标准设备坐标转世界坐标
    var worldVector = standardVector.unproject(camera);
    return worldVector;
}
/*世界坐标转屏幕坐标*/
function getScreenCoordinates(X,Y,Z) {
    /*获取模型的世界坐标*/
    var worldVector = new THREE.Vector3(X,Y,Z);
    var standardVector = worldVector.project(camera);//世界坐标转标准设备坐标
    var a = window.innerWidth / 2;
    var b = window.innerHeight / 2;
    var Sx = Math.round(standardVector.x * a + a);//标准设备坐标转屏幕坐标
    var Sy = Math.round(-standardVector.y * b + b);//标准设备坐标转屏幕坐标
    return {screenX:Sx,screenY:Sy};
}
/*更改大小*/
function onWindowResize() {
    Width=window.innerWidth;
    Height=window.innerHeight;
    if(plantTip.style.display=="block"){
        var x=window.innerWidth/2-151;
        var y=window.innerHeight/2-121;
        plantTip.style.marginLeft=x+"px";
        plantTip.style.marginTop=y+"px";
    }
    if(smallTip.style.display=='block'){
        setPos(window.innerWidth/2,2*window.innerHeight/3)
    }
    camera.aspect = Width / Height;
    camera.updateProjectionMatrix();
    renderer.setSize( Width, Height );
}
/*渲染循环*/
function animate() {
    requestAnimationFrame( animate );
    render();
}
function render() {
    controls.update();
    if(TreesNumber>0&&plantTrees[TreesNumber-1].scale.x<scale)
        plantTrees[TreesNumber-1].scale.x =  plantTrees[TreesNumber-1].scale.y =  plantTrees[TreesNumber-1].scale.z = plantTrees[TreesNumber-1].scale.x+0.001;
    if(sumNumber>0&&plantFruits[sumNumber-1].scale.x<0.2)
        plantFruits[sumNumber-1].scale.x =  plantFruits[sumNumber-1].scale.y =  plantFruits[sumNumber-1].scale.z = plantFruits[sumNumber-1].scale.x+0.001;
    renderer.render( scene, camera );
}
/*运行程序*/
function Start() {
    initial();
    initRenderer();
    initCamera();
    initScene();
    initLight();
    initObject();
    initEvent();
    animate();
}
