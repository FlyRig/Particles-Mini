function CLimit(t,i,e,a,l,o,r){this.limitType=t,this.init(i,e,a,l,o,r),this.id=0}CLimit.prototype.init=function(t,i,e,a,l,o){switch(this.limitType){default:case LIM_NONE:break;case LIM_VOL:void 0!==t&&void 0!==i&&void 0!==e?this.initLimVol(t,i,e,a,l):this.initLimVol([0,0,75],[200,200,150],[1,.5,0],[-.5,1,0],.85);break;case LIM_BALL_IN:case LIM_BALL_OUT:void 0!==t&&void 0!==i&&void 0!==e?this.initLimBallOut(t,i,e):this.initLimBallOut([0,0,6],5,.85);break;case LIM_PLATE:void 0!==t&&void 0!==i&&void 0!==e?this.initLimPlate(t,i,e,a,l,o):this.initLimPlate(glMatrix.vec3.fromValues(0,0,5),glMatrix.vec3.fromValues(1,.5,0),glMatrix.vec3.fromValues(0,1,0),10,10,.85);break;case LIM_PLATE_HOLE:void 0!==t&&void 0!==i&&void 0!==e?this.initLimPlateHole(t,i,e,a,l,o):this.initLimPlateHole(glMatrix.vec3.fromValues(0,0,0),glMatrix.vec3.fromValues(1,0,0),glMatrix.vec3.fromValues(0,1,0),10,10,.55,4);break;case LIM_INF_PLANE:void 0!==t&&void 0!==i&&void 0!==e?this.initLimInfPlane(t,i,e):this.initLimInfPlane([0,0,0],[0,0,1],.85);break;case LIM_VORTEX:void 0!==t&&void 0!==i&&void 0!==e?this.initLimVortex(t,i,e,a,l,o):this.initLimVortex([0,0,0],15,30,[0,0,1],4,2);break;case LIM_COLOR_AGE:void 0!==t&&void 0!==i&&void 0!==e?this.initLimColorAge(t,i,e,a):this.initLimColorAge(2,0,.25,1);break;case LIM_COLOR_VEL:void 0!==t?this.initLimColorVel(t):this.initLimColorVel(0);break;case LIM_VEL_CMPDR:void 0!==t&&void 0!==i?this.initLimVelCmpdr(t,i):this.initLimVelCmpdr(.5,10)}},CLimit.prototype.initLimVol=function(t,e,a,l,o){this.pos=glMatrix.vec3.clone(t),this.len=glMatrix.vec3.clone(a),glMatrix.vec3.normalize(this.len,this.len),this.wid=glMatrix.vec3.clone(l),glMatrix.vec3.normalize(this.wid,this.wid),this.norm=glMatrix.vec3.create(),glMatrix.vec3.cross(this.norm,this.len,this.wid),glMatrix.vec3.normalize(this.norm,this.norm),glMatrix.vec3.negate(this.norm,this.norm),this.dim=glMatrix.vec3.clone(e),glMatrix.vec3.scale(this.dim,this.dim,.5),this.K_resti=o,this.w2p=glMatrix.mat4.create(),this.w2p[0]=this.len[0],this.w2p[1]=this.wid[0],this.w2p[2]=this.norm[0],this.w2p[4]=this.len[1],this.w2p[5]=this.wid[1],this.w2p[6]=this.norm[1],this.w2p[8]=this.len[2],this.w2p[9]=this.wid[2],this.w2p[10]=this.norm[2];o=glMatrix.mat4.create();o[12]=-this.pos[0],o[13]=-this.pos[1],o[14]=-this.pos[2],glMatrix.mat4.multiply(this.w2p,this.w2p,o);Math.PI,glMatrix.vec3.angle(this.len,this.wid);for(glMatrix.mat4.invert(this.w2p,this.w2p),this.vboContents=generator.cube(this.pos,this.dim),i=0;i<this.vboContents.length;i+=3){var r=glMatrix.vec4.fromValues(this.vboContents[i],this.vboContents[i+1],this.vboContents[i+2],1);glMatrix.vec4.transformMat4(r,r,this.w2p),this.vboContents[i]=r[0]+this.pos[0],this.vboContents[i+1]=r[1]+this.pos[1],this.vboContents[i+2]=r[2]+this.pos[2]}glMatrix.mat4.invert(this.w2p,this.w2p),this.iboContents=generator.cubeIndLS(),this.modelMat=glMatrix.mat4.create()},CLimit.prototype.initLimBallOut=function(t,i,e){this.px=t[0],this.py=t[1],this.pz=t[2],this.radius=i,this.K_resti=e,this.pos=glMatrix.vec3.clone(t),this.vboContents=generator.sphere(t,i,24),this.iboContents=generator.sphereIndLS(24),this.modelMat=glMatrix.mat4.create()},CLimit.prototype.initLimPlate=function(t,i,e,a,l,o){this.wc=glMatrix.vec3.clone(t),this.len=glMatrix.vec3.clone(i),glMatrix.vec3.normalize(this.len,this.len),this.wid=glMatrix.vec3.clone(e),glMatrix.vec3.normalize(this.wid,this.wid),this.norm=glMatrix.vec3.create(),glMatrix.vec3.cross(this.norm,this.len,this.wid),glMatrix.vec3.normalize(this.norm,this.norm),this.lMax=a,this.wMax=l,this.K_resti=o,this.world2wall=glMatrix.mat4.create(),this.world2wall[0]=this.len[0],this.world2wall[1]=this.wid[0],this.world2wall[2]=this.norm[0],this.world2wall[4]=this.len[1],this.world2wall[5]=this.wid[1],this.world2wall[6]=this.norm[1],this.world2wall[8]=this.len[2],this.world2wall[9]=this.wid[2],this.world2wall[10]=this.norm[2];o=glMatrix.mat4.create();o[12]=-this.wc[0],o[13]=-this.wc[1],o[14]=-this.wc[2],glMatrix.mat4.multiply(this.world2wall,this.world2wall,o),this.vboContents=generator.quad(this.wc,this.norm,this.lMax,this.wMax),this.iboContents=generator.quadIndLS(),this.modelMat=glMatrix.mat4.create()},CLimit.prototype.initLimPlateHole=function(t,i,e,a,l,o,r){this.wc=glMatrix.vec3.clone(t),this.len=glMatrix.vec3.clone(i),glMatrix.vec3.normalize(this.len,this.len),this.wid=glMatrix.vec3.clone(e),glMatrix.vec3.normalize(this.wid,this.wid),this.norm=glMatrix.vec3.create(),glMatrix.vec3.cross(this.norm,this.len,this.wid),this.lMax=a,this.wMax=l,this.K_resti=o,this.radius=r,(this.radius>this.lMax||this.radius>this.wMax)&&(this.radius=Math.max(this.lMax,this.wMax)),this.world2wall=glMatrix.mat4.create(),this.world2wall[0]=this.len[0],this.world2wall[1]=this.wid[0],this.world2wall[2]=this.norm[0],this.world2wall[4]=this.len[1],this.world2wall[5]=this.wid[1],this.world2wall[6]=this.norm[1],this.world2wall[8]=this.len[2],this.world2wall[9]=this.wid[2],this.world2wall[10]=this.norm[2];r=glMatrix.mat4.create();r[12]=-this.wc[0],r[13]=-this.wc[1],r[14]=-this.wc[2],glMatrix.mat4.multiply(this.world2wall,this.world2wall,r),this.vboContents=generator.quadHole(this.wc,this.norm,this.lMax,this.wMax,this.radius),this.iboContents=generator.quadHoleIndLS(),this.modelMat=glMatrix.mat4.create()},CLimit.prototype.initLimInfPlane=function(t,i,e){var a=glMatrix.vec3.clone(i);glMatrix.vec3.normalize(a,a);var l=glMatrix.vec3.dot(t,a);this.norm=glMatrix.vec4.fromValues(a[0],a[1],a[2],-l),this.K_resti=e,this.point=glMatrix.vec3.clone(t),this.vboContents=generator.quad(t,i,5,5),this.iboContents=generator.quadIndLS(),this.modelMat=glMatrix.mat4.create()},CLimit.prototype.initLimVortex=function(t,i,e,a,l,o){this.base=t,this.radius=i,this.height=e,this.axis=glMatrix.vec3.clone(a),glMatrix.vec3.normalize(this.axis,this.axis),this.freq=l,this.tight=o,this.fmax=6,this.vboContents=generator.cylin(t,i,e,this.axis,16),this.iboContents=generator.cylinIndLS(16),this.modelMat=glMatrix.mat4.create()},CLimit.prototype.initLimColorAge=function(t,i,e){this.mode=t,this.start=i,this.range=e-this.start},CLimit.prototype.initLimColorVel=function(t){this.offset=t},CLimit.prototype.initLimVelCmpdr=function(t,i){this.min=t,this.max=i},CLimit.prototype.calculate=function(t,i,e){switch(this.limitType){default:case LIM_NONE:break;case LIM_VOL:this.limVolCalc(t,i,e);break;case LIM_BALL_IN:this.limBallInCalc(t,i,e);break;case LIM_BALL_OUT:this.limBallOutCalc(t,i,e);break;case LIM_PLATE:this.limPlateCalc(t,i,e);break;case LIM_PLATE_HOLE:this.limPlateHoleCalc(t,i,e);break;case LIM_INF_PLANE:this.limInfPlaneCalc(t,i,e);break;case LIM_VORTEX:this.limVortexCalc(t,i,e);break;case LIM_COLOR_AGE:this.limColorAge(t,i,e);break;case LIM_COLOR_VEL:this.limColorVel(t,i,e);break;case LIM_VEL_CMPDR:this.limVelCmpdr(t,i,e)}},CLimit.prototype.limVolCalc=function(t,i,e){var a,l=glMatrix.vec4.fromValues(t[e+CPU_PART_XPOS],t[e+CPU_PART_YPOS],t[e+CPU_PART_ZPOS],1),o=glMatrix.vec4.fromValues(i[e+CPU_PART_XPOS],i[e+CPU_PART_YPOS],i[e+CPU_PART_ZPOS],1),r=glMatrix.vec4.create(),s=glMatrix.vec4.create();if(glMatrix.vec4.transformMat4(r,l,this.w2p),glMatrix.vec4.transformMat4(s,o,this.w2p),Math.abs(s[0])>this.dim[0])n=0,a=this.len;else if(Math.abs(s[1])>this.dim[1])n=1,a=this.wid;else{if(!(Math.abs(s[2])>this.dim[2]))return;n=2,a=this.norm}t=glMatrix.vec3.clone(a),r=glMatrix.vec3.create();glMatrix.vec3.sub(r,o,l),glMatrix.vec3.scale(r,r,1/g_timeStep),glMatrix.vec3.scale(t,t,glMatrix.vec3.dot(r,t));s=glMatrix.vec3.create();glMatrix.vec3.sub(s,r,t);l=glMatrix.vec3.create(),r=glMatrix.vec3.create();glMatrix.vec3.scale(r,a,this.dim[n]);var n=glMatrix.vec3.clone(r);glMatrix.vec3.sub(r,this.pos,r),glMatrix.vec3.add(n,this.pos,n),glMatrix.vec3.dist(r,o)<=glMatrix.vec3.dist(n,o)?glMatrix.vec3.sub(l,o,r):glMatrix.vec3.sub(l,o,n);l=glMatrix.vec3.dot(l,a);l*=1+this.K_resti,i[e+CPU_PART_XPOS]-=l*a[0],i[e+CPU_PART_YPOS]-=l*a[1],i[e+CPU_PART_ZPOS]-=l*a[2],glMatrix.vec3.scale(t,t,-this.K_resti),i[e+CPU_PART_XVEL]=t[0]+s[0],i[e+CPU_PART_YVEL]=t[1]+s[1],i[e+CPU_PART_ZVEL]=t[2]+s[2]},CLimit.prototype.limBallInCalc=function(t,i,e){var a,l,o,r=glMatrix.vec3.fromValues(i[e+CPU_PART_XPOS]-this.px,i[e+CPU_PART_YPOS]-this.py,i[e+CPU_PART_ZPOS]-this.pz),s=glMatrix.vec3.len(r);s>this.radius&&(s-=this.radius,glMatrix.vec3.normalize(r,r),glMatrix.vec3.negate(r,r),a=glMatrix.vec3.fromValues(i[e+CPU_PART_XVEL],i[e+CPU_PART_YVEL],i[e+CPU_PART_ZVEL]),s*=-(l=1+this.K_resti),o=glMatrix.vec3.create(),glMatrix.vec3.scale(o,r,s),i[e+CPU_PART_XPOS]-=o[0],i[e+CPU_PART_YPOS]-=o[1],i[e+CPU_PART_ZPOS]-=o[2],o=glMatrix.vec3.create(),glMatrix.vec3.scale(o,r,l*glMatrix.vec3.dot(r,a)),glMatrix.vec3.subtract(o,a,o),i[e+CPU_PART_XVEL]=o[0],i[e+CPU_PART_YVEL]=o[1],i[e+CPU_PART_ZVEL]=o[2])},CLimit.prototype.limBallOutCalc=function(t,i,e){var a,l,o,r=glMatrix.vec3.fromValues(i[e+CPU_PART_XPOS]-this.px,i[e+CPU_PART_YPOS]-this.py,i[e+CPU_PART_ZPOS]-this.pz);r[0]>=this.radius||r[1]>=this.radius||r[2]>=this.radius||glMatrix.vec3.len(r)<this.radius&&(l=glMatrix.vec3.fromValues(i[e+CPU_PART_XPOS]-t[e+CPU_PART_XPOS],i[e+CPU_PART_YPOS]-t[e+CPU_PART_YPOS],i[e+CPU_PART_ZPOS]-t[e+CPU_PART_ZPOS]),o=glMatrix.vec3.fromValues(this.px-t[e+CPU_PART_XPOS],this.py-t[e+CPU_PART_YPOS],this.pz-t[e+CPU_PART_ZPOS]),a=glMatrix.vec3.sqrLen(l),r=-2*glMatrix.vec3.dot(l,o),o=glMatrix.vec3.sqrLen(o),o-=this.radius*this.radius,o=-r-Math.sqrt(r*r-4*a*o),o/=2*a,glMatrix.vec3.scale(l,l,o),i[e+CPU_PART_XPOS]=t[e+CPU_PART_XPOS]+l[0],i[e+CPU_PART_YPOS]=t[e+CPU_PART_YPOS]+l[1],i[e+CPU_PART_ZPOS]=t[e+CPU_PART_ZPOS]+l[2],o=1/this.radius,t=glMatrix.vec3.fromValues((i[e+CPU_PART_XPOS]-this.px)*o,(i[e+CPU_PART_YPOS]-this.py)*o,(i[e+CPU_PART_ZPOS]-this.pz)*o),l=glMatrix.vec3.fromValues(i[e+CPU_PART_XVEL],i[e+CPU_PART_YVEL],i[e+CPU_PART_ZVEL]),o=2*glMatrix.vec3.dot(t,l),glMatrix.vec3.scale(t,t,o),glMatrix.vec3.sub(l,l,t),i[e+CPU_PART_XVEL]=l[0]*this.K_resti,i[e+CPU_PART_YVEL]=l[1]*this.K_resti,i[e+CPU_PART_ZVEL]=l[2]*this.K_resti)},CLimit.prototype.limPlateCalc=function(t,i,e){var a=glMatrix.vec4.fromValues(t[e+CPU_PART_XPOS],t[e+CPU_PART_YPOS],t[e+CPU_PART_ZPOS],1),l=glMatrix.vec4.fromValues(i[e+CPU_PART_XPOS],i[e+CPU_PART_YPOS],i[e+CPU_PART_ZPOS],1),o=glMatrix.vec4.create(),t=glMatrix.vec4.create();glMatrix.vec4.transformMat4(o,a,this.world2wall),glMatrix.vec4.transformMat4(t,l,this.world2wall),t[0]*t[0]<=this.lMax*this.lMax&&t[1]*t[1]<=this.wMax*this.wMax&&(0<o[2]&&t[2]<=0||o[2]<=0&&0<t[2])&&(a=glMatrix.vec3.fromValues(i[e+CPU_PART_XVEL],i[e+CPU_PART_YVEL],i[e+CPU_PART_ZVEL]),o=glMatrix.vec3.clone(this.norm),glMatrix.vec3.scale(o,o,glMatrix.vec3.dot(a,o)),t=glMatrix.vec3.create(),glMatrix.vec3.sub(t,a,o),a=glMatrix.vec3.create(),glMatrix.vec3.sub(a,l,this.wc),a=glMatrix.vec3.dot(a,this.norm),a*=1+this.K_resti,i[e+CPU_PART_XPOS]-=a*this.norm[0],i[e+CPU_PART_YPOS]-=a*this.norm[1],i[e+CPU_PART_ZPOS]-=a*this.norm[2],glMatrix.vec3.scale(o,o,-this.K_resti),i[e+CPU_PART_XVEL]=o[0]+t[0],i[e+CPU_PART_YVEL]=o[1]+t[1],i[e+CPU_PART_ZVEL]=o[2]+t[2])},CLimit.prototype.limPlateHoleCalc=function(t,i,e){var a=glMatrix.vec4.fromValues(t[e+CPU_PART_XPOS],t[e+CPU_PART_YPOS],t[e+CPU_PART_ZPOS],1),l=glMatrix.vec4.fromValues(i[e+CPU_PART_XPOS],i[e+CPU_PART_YPOS],i[e+CPU_PART_ZPOS],1),o=glMatrix.vec4.create(),t=glMatrix.vec4.create();glMatrix.vec4.transformMat4(o,a,this.world2wall),glMatrix.vec4.transformMat4(t,l,this.world2wall),t[0]*t[0]<=this.lMax*this.lMax&&t[1]*t[1]<=this.wMax*this.wMax&&(0<o[2]&&t[2]<=0||o[2]<=0&&0<t[2])&&glMatrix.vec3.distance(l,this.wc)>this.radius&&(a=glMatrix.vec3.fromValues(i[e+CPU_PART_XVEL],i[e+CPU_PART_YVEL],i[e+CPU_PART_ZVEL]),o=glMatrix.vec3.clone(this.norm),glMatrix.vec3.scale(o,o,glMatrix.vec3.dot(a,o)),t=glMatrix.vec3.create(),glMatrix.vec3.sub(t,a,o),a=glMatrix.vec3.create(),glMatrix.vec3.sub(a,l,this.wc),a=glMatrix.vec3.dot(a,this.norm),a*=1+this.K_resti,i[e+CPU_PART_XPOS]-=a*this.norm[0],i[e+CPU_PART_YPOS]-=a*this.norm[1],i[e+CPU_PART_ZPOS]-=a*this.norm[2],glMatrix.vec3.scale(o,o,-this.K_resti),i[e+CPU_PART_XVEL]=o[0]+t[0],i[e+CPU_PART_YVEL]=o[1]+t[1],i[e+CPU_PART_ZVEL]=o[2]+t[2])},CLimit.prototype.limInfPlaneCalc=function(t,i,e){var a,l=glMatrix.vec4.fromValues(t[e+CPU_PART_XPOS],t[e+CPU_PART_YPOS],t[e+CPU_PART_ZPOS],1),o=glMatrix.vec4.fromValues(i[e+CPU_PART_XPOS],i[e+CPU_PART_YPOS],i[e+CPU_PART_ZPOS],1),r=glMatrix.vec4.dot(l,this.norm),s=glMatrix.vec4.dot(o,this.norm);0<=r&&0<=s||r<0&&s<0||(a=glMatrix.vec3.create(),glMatrix.vec3.sub(a,o,l),glMatrix.vec3.scale(a,a,1/g_timeStep),s=r/glMatrix.vec3.dot(a,this.norm),o=glMatrix.vec3.fromValues(i[e+CPU_PART_XVEL]-t[e+CPU_PART_XVEL],i[e+CPU_PART_YVEL]-t[e+CPU_PART_YVEL],i[e+CPU_PART_ZVEL]-t[e+CPU_PART_ZVEL]),glMatrix.vec3.scale(o,o,s),r=glMatrix.vec3.len([t[e+CPU_PART_XVEL]+o[0],t[e+CPU_PART_YVEL]+o[1],t[e+CPU_PART_ZVEL]+o[2]]),glMatrix.vec3.normalize(a,a),glMatrix.vec3.scale(a,a,r),t=glMatrix.vec3.clone(a),r=2*glMatrix.vec3.dot(t,this.norm),glMatrix.vec3.scale(o,this.norm,r),glMatrix.vec3.sub(t,t,o),i[e+CPU_PART_XVEL]=t[0]*this.K_resti,i[e+CPU_PART_YVEL]=t[1]*this.K_resti,i[e+CPU_PART_ZVEL]=t[2]*this.K_resti,glMatrix.vec3.scale(a,a,s),glMatrix.vec3.add(a,a,l),i[e+CPU_PART_XPOS]=a[0],i[e+CPU_PART_YPOS]=a[1],i[e+CPU_PART_ZPOS]=a[2])},CLimit.prototype.limVortexCalc=function(t,i,e){var a,l,o,r=glMatrix.vec3.fromValues(i[e+CPU_PART_XPOS]-this.base[0],i[e+CPU_PART_YPOS]-this.base[1],i[e+CPU_PART_ZPOS]-this.base[2]),s=glMatrix.vec3.dot(r,this.axis);0<=s&&s<=this.height&&(a=glMatrix.vec3.create(),glMatrix.vec3.scaleAndAdd(a,r,this.axis,-s),(l=glMatrix.vec3.length(a))>this.radius||(o=Math.pow(this.radius/l,this.tight)*this.freq,o=Math.min(this.fmax,o),r=2*Math.PI*o,s=glMatrix.vec3.fromValues(t[e+CPU_PART_XVEL],t[e+CPU_PART_YVEL],t[e+CPU_PART_ZVEL]),l=glMatrix.vec3.fromValues(i[e+CPU_PART_XVEL],i[e+CPU_PART_YVEL],i[e+CPU_PART_ZVEL]),o=glMatrix.vec3.create(),t=glMatrix.vec3.create(),glMatrix.vec3.add(o,s,l),glMatrix.vec3.scale(o,o,.5),glMatrix.vec3.cross(t,a,this.axis),glMatrix.vec3.normalize(t,t),glMatrix.vec3.scale(t,t,r),glMatrix.vec3.add(o,o,t),glMatrix.vec3.scale(o,o,g_timeStep),i[e+CPU_PART_XPOS]+=o[0],i[e+CPU_PART_YPOS]+=o[1],i[e+CPU_PART_ZPOS]+=o[2]))},CLimit.prototype.limColorAge=function(t,i,e){var a=i[e+CPU_PART_AGE]/i[e+CPU_PART_LIFE];a*=this.range,a+=this.start,i[e+CPU_PART_HUE+this.mode]=a},CLimit.prototype.limColorVel=function(t,i,e){var a=glMatrix.vec2.fromValues(i[e+CPU_PART_XVEL],i[e+CPU_PART_YVEL]),l=glMatrix.vec2.create();l[0]=1;l=glMatrix.vec2.angle(l,a);l*=180/Math.PI,a[1]<0&&(l=-l),i[e+CPU_PART_HUE]=l+this.offset},CLimit.prototype.limVelCmpdr=function(t,i,e){var a=glMatrix.vec3.fromValues(i[e+CPU_PART_XVEL],i[e+CPU_PART_YVEL],i[e+CPU_PART_ZVEL]),l=glMatrix.vec3.sqrLen(a);if(l<this.min*this.min)glMatrix.vec3.normalize(a,a),glMatrix.vec3.scale(a,a,this.min);else{if(!(l>this.max*this.max))return;glMatrix.vec3.normalize(a,a),glMatrix.vec3.scale(a,a,this.max)}i[e+CPU_PART_XVEL]=a[0],i[e+CPU_PART_YVEL]=a[1],i[e+CPU_PART_ZVEL]=a[2]},CLimit.prototype.getStructs=function(){return`
		struct LIM_VOL {
			mat4 w2p;
			vec3 pos;
			vec3 dim;
			vec3 len;
			vec3 wid;
			vec3 norm;
			float kres;
		};
		
		struct LIM_BALL_IN {
			vec3 pos;
			float r;
			float kres;
		};
		
		struct LIM_BALL_OUT {
			vec3 pos;
			float r;
			float kres;
		};
		
		struct LIM_PLATE {
			mat4 w2w;
			vec3 wc;
			vec3 norm;
			float lMax;
			float wMax;
			float kres;
		};
		
		struct LIM_PLATE_HOLE {
			mat4 w2w;
			vec3 wc;
			vec3 norm;
			float lMax;
			float wMax;
			float kres;
			float r;
		};
		
		struct LIM_INF_PLANE {
			vec4 norm;
			float kres;
		};
		
		struct LIM_VORTEX {
			vec3 base;
			vec3 axis;
			float radius;
			float height;
			float freq;
			float tight;
		};
		
		struct LIM_COLOR_AGE {
			float start;
			float range;
		};
		
		struct LIM_COLOR_VEL {
			float offset;
		};
		
		struct LIM_VEL_CMPDR {
			float min;
			float max;
		};
	`},CLimit.prototype.getUniforms=function(t){if(t!=this.id)return"";var i="";switch(this.limitType){case LIM_VOL:i+="uniform LIM_VOL u_limVol["+t+"];\n";break;case LIM_BALL_IN:i+="uniform LIM_BALL_IN u_limBallIn["+t+"];\n";break;case LIM_BALL_OUT:i+="uniform LIM_BALL_OUT u_limBallOut["+t+"];\n";break;case LIM_PLATE:i+="uniform LIM_PLATE u_limPlate["+t+"];\n";break;case LIM_PLATE_HOLE:i+="uniform LIM_PLATE_HOLE u_limPlateHole["+t+"];\n";break;case LIM_INF_PLANE:i+="uniform LIM_INF_PLANE u_limInfPlane["+t+"];\n";break;case LIM_VORTEX:i+="uniform LIM_VORTEX u_limVortex["+t+"];\n";break;case LIM_COLOR_AGE:i+="uniform LIM_COLOR_AGE u_limColorAge["+t+"];\n";break;case LIM_COLOR_VEL:i+="uniform LIM_COLOR_VEL u_limColorVel["+t+"];\n";break;case LIM_VEL_CMPDR:i+="uniform LIM_VEL_CMPDR u_limVelCmpdr["+t+"];\n"}return i},CLimit.prototype.getUniformLocations=function(t){switch(this.limitType){case LIM_VOL:this.u_w2p=gl.getUniformLocation(t,"u_limVol["+(this.id-1)+"].w2p"),this.u_pos=gl.getUniformLocation(t,"u_limVol["+(this.id-1)+"].pos"),this.u_dim=gl.getUniformLocation(t,"u_limVol["+(this.id-1)+"].dim"),this.u_len=gl.getUniformLocation(t,"u_limVol["+(this.id-1)+"].len"),this.u_wid=gl.getUniformLocation(t,"u_limVol["+(this.id-1)+"].wid"),this.u_norm=gl.getUniformLocation(t,"u_limVol["+(this.id-1)+"].norm"),this.u_kres=gl.getUniformLocation(t,"u_limVol["+(this.id-1)+"].kres");break;case LIM_BALL_IN:this.u_pos=gl.getUniformLocation(t,"u_limBallIn["+(this.id-1)+"].pos"),this.u_r=gl.getUniformLocation(t,"u_limBallIn["+(this.id-1)+"].r"),this.u_kres=gl.getUniformLocation(t,"u_limBallIn["+(this.id-1)+"].kres");break;case LIM_BALL_OUT:this.u_pos=gl.getUniformLocation(t,"u_limBallOut["+(this.id-1)+"].pos"),this.u_r=gl.getUniformLocation(t,"u_limBallOut["+(this.id-1)+"].r"),this.u_kres=gl.getUniformLocation(t,"u_limBallOut["+(this.id-1)+"].kres");break;case LIM_PLATE:this.u_w2w=gl.getUniformLocation(t,"u_limPlate["+(this.id-1)+"].w2w"),this.u_wc=gl.getUniformLocation(t,"u_limPlate["+(this.id-1)+"].wc"),this.u_norm=gl.getUniformLocation(t,"u_limPlate["+(this.id-1)+"].norm"),this.u_lMax=gl.getUniformLocation(t,"u_limPlate["+(this.id-1)+"].lMax"),this.u_wMax=gl.getUniformLocation(t,"u_limPlate["+(this.id-1)+"].wMax"),this.u_kres=gl.getUniformLocation(t,"u_limPlate["+(this.id-1)+"].kres");break;case LIM_PLATE_HOLE:this.u_w2w=gl.getUniformLocation(t,"u_limPlateHole["+(this.id-1)+"].w2w"),this.u_wc=gl.getUniformLocation(t,"u_limPlateHole["+(this.id-1)+"].wc"),this.u_norm=gl.getUniformLocation(t,"u_limPlateHole["+(this.id-1)+"].norm"),this.u_lMax=gl.getUniformLocation(t,"u_limPlateHole["+(this.id-1)+"].lMax"),this.u_wMax=gl.getUniformLocation(t,"u_limPlateHole["+(this.id-1)+"].wMax"),this.u_kres=gl.getUniformLocation(t,"u_limPlateHole["+(this.id-1)+"].kres"),this.u_r=gl.getUniformLocation(t,"u_limPlateHole["+(this.id-1)+"].r");break;case LIM_INF_PLANE:this.u_norm=gl.getUniformLocation(t,"u_limInfPlane["+(this.id-1)+"].norm"),this.u_kres=gl.getUniformLocation(t,"u_limInfPlane["+(this.id-1)+"].kres");break;case LIM_VORTEX:this.u_base=gl.getUniformLocation(t,"u_limVortex["+(this.id-1)+"].base"),this.u_axis=gl.getUniformLocation(t,"u_limVortex["+(this.id-1)+"].axis"),this.u_radius=gl.getUniformLocation(t,"u_limVortex["+(this.id-1)+"].radius"),this.u_height=gl.getUniformLocation(t,"u_limVortex["+(this.id-1)+"].height"),this.u_freq=gl.getUniformLocation(t,"u_limVortex["+(this.id-1)+"].freq"),this.u_tight=gl.getUniformLocation(t,"u_limVortex["+(this.id-1)+"].tight");break;case LIM_COLOR_AGE:this.u_start=gl.getUniformLocation(t,"u_limColorAge["+(this.id-1)+"].start"),this.u_range=gl.getUniformLocation(t,"u_limColorAge["+(this.id-1)+"].range");break;case LIM_COLOR_VEL:this.u_offset=gl.getUniformLocation(t,"u_limColorVel["+(this.id-1)+"].offset");break;case LIM_VEL_CMPDR:this.u_min=gl.getUniformLocation(t,"u_limVelCmpdr["+(this.id-1)+"].min"),this.u_max=gl.getUniformLocation(t,"u_limVelCmpdr["+(this.id-1)+"].max")}},CLimit.prototype.bindUniforms=function(){switch(this.limitType){case LIM_VOL:gl.uniformMatrix4fv(this.u_w2p,!1,this.w2p),gl.uniform3fv(this.u_pos,this.pos),gl.uniform3fv(this.u_dim,this.dim),gl.uniform3fv(this.u_len,this.len),gl.uniform3fv(this.u_wid,this.wid),gl.uniform3fv(this.u_norm,this.norm),gl.uniform1f(this.u_kres,this.K_resti);break;case LIM_BALL_IN:case LIM_BALL_OUT:gl.uniform3fv(this.u_pos,this.pos),gl.uniform1f(this.u_r,this.r),gl.uniform1f(this.u_kres,this.kres);break;case LIM_PLATE:gl.uniformMatrix4fv(this.u_w2w,!1,this.w2w),gl.uniform3fv(this.u_wc,this.wc),gl.uniform3fv(this.u_norm,this.norm),gl.uniform1f(this.u_lMax,this.lMax),gl.uniform1f(this.u_wMax,this.wMax),gl.uniform1f(this.u_kres,this.kres);break;case LIM_PLATE_HOLE:gl.uniformMatrix4fv(this.u_w2w,!1,this.w2w),gl.uniform3fv(this.u_wc,this.wc),gl.uniform3fv(this.u_norm,this.norm),gl.uniform1f(this.u_lMax,this.lMax),gl.uniform1f(this.u_wMax,this.wMax),gl.uniform1f(this.u_kres,this.kres),gl.uniform1f(this.u_r,this.r);break;case LIM_INF_PLANE:gl.uniform4fv(this.u_norm,this.norm),gl.uniform1f(this.u_kres,this.K_resti);break;case LIM_VORTEX:gl.uniform3fv(this.u_base,this.base),gl.uniform3fv(this.u_axis,this.axis),gl.uniform1f(this.u_radius,this.radius),gl.uniform1f(this.u_height,this.height),gl.uniform1f(this.u_freq,this.freq),gl.uniform1f(this.u_tight,this.tight);break;case LIM_COLOR_AGE:gl.uniform1f(this.u_start,this.start),gl.uniform1f(this.u_range,this.range);break;case LIM_COLOR_VEL:gl.uniform1f(this.u_offset,this.offset);break;case LIM_VEL_CMPDR:gl.uniform1f(this.u_min,this.min),gl.uniform1f(this.u_max,this.max)}},CLimit.prototype.getCalc=function(){switch(this.limitType){default:case LIM_NONE:return;case LIM_VOL:return this.getLimVolCalc();case LIM_BALL_IN:return this.getLimBallInCalc();case LIM_BALL_OUT:return this.getLimBallOutCalc();case LIM_PLATE:return this.getLimPlateCalc();case LIM_PLATE_HOLE:return this.getLimPlateHoleCalc();case LIM_INF_PLANE:return this.getLimInfPlaneCalc();case LIM_VORTEX:return this.getLimVortexCalc();case LIM_COLOR_AGE:return this.getLimColorAgeCalc();case LIM_COLOR_VEL:return this.getLimColorVelCalc();case LIM_VEL_CMPDR:return this.getLimVelCmpdrCalc()}},CLimit.prototype.getLimVolCalc=function(){return`
 		/**
		 * Calculates the effect a bounding box has on a particle
		 *	Assumes particles start inside the box
		 *
		 * @param {mat4} w2p world to prism matrix
		 * @param {vec3} pos position vector
		 * @param {vec3} dim dimensions vector
		 * @param {vec3} len length vector
		 * @param {vec3} wid width vector
		 * @param {vec3} norm normal vector
		 * @param {float} kres coefficient of restitution
		 */
		 void limVolCalc(mat4 w2p, vec3 pos, vec3 dim, vec3 len, vec3 wid, vec3 norm, float kres) {
		 	vec4 wp2 = w2p * vec4(v_Position, 1.0);
		 	
		 	int bound;
		 	vec3 boundNorm;
		 	if (abs(wp2[0]) > dim[0]) {
		 		bound = 0;
		 		boundNorm = len;
		 	} 
		 	else if (abs(wp2[1]) > dim[1]) {
		 		bound = 1;
		 		boundNorm = wid;
		 	}
		 	else if (abs(wp2[2]) > dim[2]) {
		 		bound = 2;
		 		boundNorm = norm;
		 	}
		 	else
		 		return;
		 		
		 	vec3 velocity = (v_Position - a_Position) / u_timeStep;
		 	vec3 vn = boundNorm * dot(velocity, boundNorm);
		 	vec3 vt = velocity - vn;
		 	
		 	vec3 plane = boundNorm * dim[bound];
		 	
		 	float dist1 = distance((pos - plane), v_Position);
		 	float dist2 = distance((pos + plane), v_Position);
		 	
		 	if (dist1 <= dist2)
		 		plane = v_Position - (pos - plane);
		 	else
		 		plane = v_Position - (pos + plane);
		 	
		 	float dn1 = (1.0 + kres) * dot(plane, boundNorm);
		 	
		 	v_Position -= dn1 * boundNorm;
		 	
		 	v_Velocity = (vn * -kres) + vt;
		 }
 	`},CLimit.prototype.getLimBallInCalc=function(){return`
 		/**
		 * Calculates LIM_BALL_IN
 		 *
 		 * @param {vec3} pos vector of sphere center
		 * @param {float} r radius of sphere
		 * @param {float} kres coefficient of restitution
		 */
		 void limBallInCalc(vec3 pos, float r, float kres) {
		 	float dist = distance(v_Position, pos);
		 	if (dist <= r)
		 		return;
		 	
		 	vec3 normal = normalize(pos - v_Position);
			v_Position -= (1.0 + kres) * (r-dist) * normal;
			v_Velocity -= (1.0 + kres) * normal * dot(v_Velocity, normal);
		 }
	`},CLimit.prototype.getLimBallOutCalc=function(){return`
 		/**
		 * Calculates LIM_BALL_OUT
 		 *
 		 * @param {vec3} pos vector of sphere center
		 * @param {float} r radius of sphere
		 * @param {float} kres coefficient of restitution
		 */
		 void limBallOutCalc(vec3 pos, float r, float kres) {
		 	float dist = distance(v_Position, pos);
		 	if (dist >= r)
		 		return;
		 		
		 	//based on:
			//	http://www.ambrsoft.com/TrigoCalc/Sphere/SpherLineIntersection_.htm
		 		
		 	vec3 difXYZ = v_Position - a_Position;
		 	vec3 difC = pos - a_Position;
		 	
		 	float a = dot(difXYZ, difXYZ);		//x*x + y*y + z*z
		 	float b = -2.0 * dot(difXYZ, difC);
		 	float c = dot(difC, difC);
		 	c -= r * r;
		 	
		 	float disc = (b * b) - (4.0 * a * c);
		 	float t = -b - sqrt(disc);
		 	t /= 2.0 * a;
		 	
		 	difXYZ *= t;
		 	
		 	v_Position = a_Position + difXYZ;
		 	
		 	vec3 unitNormal = normalize(v_Position - pos);
		 	
		 	v_Velocity = reflect(v_Velocity, unitNormal) * kres;
		 }
 	`},CLimit.prototype.getLimPlateCalc=function(){return`
 		/**
		 * Calculates LIM_PLATE
		 *
		 * @param {mat4} w2w world to wall transformation matrix
		 * @param {vec3} wc wall center point
		 * @param {vec3} norm normal to the plate
		 * @param {float} lMax length
		 * @param {float} wMax width
		 * @param {float} kres coefficient of restitution
		 */
		 void limPlateCalc(mat4 w2w, vec3 wc, vec3 norm, float lMax, float wMax, float kres) {
		 	vec4 wp1 = w2w * vec4(a_Position, 1.0);
		 	vec4 wp2 = w2w * vec4(v_Position, 1.0);
		 	
		 	if (wp2.x * wp2.x <= lMax * lMax && wp2.y * wp2.y <= wMax * wMax) {
		 		if ((wp1.z > 0.0 && wp2.z <= 0.0) || (wp1.z <= 0.0 && wp2.z > 0.0)) {
		 			// algorithm adapted from Chapter 4.4.3 in 
		 			// "Foundations of Physically Based Modeling and Animation"
		 			vec3 vn = dot(v_Velocity, norm) * norm;
		 			vec3 vt = v_Velocity - vn;
		 			float dn1 = dot(v_Position - wc, norm);
		 			v_Position -= (1.0 + kres) * dn1 * norm;
		 			v_Velocity = -kres * vn + vt;
		 		}
		 	}
		 }
 	`},CLimit.prototype.getLimPlateHoleCalc=function(){return`
 		/**
		 * Calculates LIM_PLATE_HOLE
		 *
		 * @param {mat4} w2w world to wall transformation matrix
		 * @param {vec3} wc wall center point
		 * @param {vec3} norm normal to the plate
		 * @param {float} lMax length
		 * @param {float} wMax width
		 * @param {float} kres coefficient of restitution
		 * @param {float} r radius of hole
		 */
		 void limPlateHoleCalc(mat4 w2w, vec3 wc, vec3 norm, float lMax, float wMax, float kres, float r) {
		 	vec4 wp1 = w2w * vec4(a_Position, 1.0);
		 	vec4 wp2 = w2w * vec4(v_Position, 1.0);
		 	
		 	if (wp2.x * wp2.x <= lMax * lMax && wp2.y * wp2.y <= wMax * wMax) {
		 		if ((wp1.z > 0.0 && wp2.z <= 0.0) || (wp1.z <= 0.0 && wp2.z > 0.0)) {
		 			if (distance(v_Position, wc) >= r) {
						vec3 vn = dot(v_Velocity, norm) * norm;
						vec3 vt = v_Velocity - vn;
						float dn1 = dot(v_Position - wc, norm);
						v_Position -= (1.0 + kres) * dn1 * norm;
						v_Velocity = -kres * vn + vt;
					}
		 		}
		 	}
		 }
 	`},CLimit.prototype.getLimInfPlaneCalc=function(){return`
		/**
		 * Calculates Infinite Collision surface
		 *
		 * @param {vec4} norm vector normal to the plane
		 * @param {float} kres coefficient of restitution
		 */
		void limInfPlaneCalc(vec4 norm, float kres) {
			float dot1 = dot(vec4(a_Position, 1.0), norm);
			float dot2 = dot(vec4(v_Position, 1.0), norm);
			
			//checks for sign change in Ax + By + Cz - D = 0
			if ((dot1 >= 0.0 && dot2 >= 0.0) || (dot1 < 0.0 && dot2 < 0.0))
				return;
			
			vec3 fakeVel = (v_Position - a_Position) / u_timeStep;
			
			float vDotN = dot(fakeVel, norm.xyz);
			float d = dot1 / vDotN;
			
			vec3 velChange = v_Velocity - a_Velocity;	//comment out for less stable 
			float velImpact = length(a_Velocity + (velChange * d)); //results
			fakeVel = normalize(fakeVel) * velImpact;
			
			v_Velocity = reflect(fakeVel, norm.xyz) * kres;
			v_Position = a_Position.xyz + (fakeVel * d);
		}
	`},CLimit.prototype.getLimVortexCalc=function(){return`
 		/**
 		 * Calculates the effect a vortex has on a particle
 		 *
 		 * @param {vec3} base position at bottom center of vortex
 		 * @param {vec3} axis of cylinder (normalized)
 		 * @param {float} radius of cylinder
 		 * @param {float} height of cylinder
 		 * @param {float} frequency of rotation, measured in Hz
 		 * @param {float} tight, tightness of falloff (2 is physically accurate)
 		 */
 		 void limVortexCalc(vec3 base, vec3 axis, float radius, float height, float freq, float tight) {
 		 	//Chapter 5.2.2 in "Foundations of Physically Based Modelling"
 		 	
 		 	vec3 xvi = v_Position - base;	//vector base to particle
 		 	float li = dot(xvi, axis); 		//length of projection of xvi on axis
 		 	
 		 	if (!(li >= 0.0 && li <= height)) //is particle within axial length
 		 		return;
 		 		
 		 	vec3 ri = xvi + (axis * -li);		// vec from axis to particle
 		 	float distRi = length(ri);			//||ri||
 		 	
 		 	if (distRi > radius)	//is particle within radius?
 		 		return;
 		 	
 		 	float fi = pow(radius / distRi, tight) * freq;
 		 	fi = min(6.0, fi);
 		 	
 		 	float w = 2.0 * PI * fi;	//angular velocity
 		 	
 		 	vec3 vAvg = (v_Velocity + a_Velocity) * 0.5;
 		 	vec3 angVel = cross(ri, axis);
 		 	angVel = normalize(angVel) * w;
 		 	
 		 	vAvg += angVel;
 		 	vAvg *= u_timeStep;
 		 	
 		 	v_Position += vAvg;
 		 }
 	`},CLimit.prototype.getLimColorAgeCalc=function(){return`
 		/**
 		 * Calculates the color based on age
 		 *
 		 * @param {int} mode 0 = Hue, 1 = Sat, 2 = Int
 		 * @param {float} start starting value
 		 * @param {float} range values (end - start)
 		 */
 		 void limColorAgeCalc(int mode, float start, float range) {
 		 	float AtoL = v_Age / v_Life;
 		 	
 		 	AtoL *= range;
 		 	AtoL += start;
 		 	if (mode == 0)
 		 		v_HSI.r = AtoL;
 		 	else if (mode == 1)
 		 		v_HSI.g = AtoL;
 		 	else
 		 		v_HSI.b = AtoL;
 		 }
 	`},CLimit.prototype.getLimColorVelCalc=function(){return`
 		/**
 		 * Calculates the color based on age
 		 *
 		 * @param {float} offset of hue change
 		 */
 		 void limColorVelCalc(float offset) {
 		 	float cmp = dot(v_Velocity.xy, vec2(1.0, 0.0)) / length(v_Velocity.xy);
			float ang = acos(cmp);
			ang = degrees(ang);
			if (v_Velocity.y < 0.0)
				ang = -ang;
			v_HSI.r = ang + offset;
 		 }
 	`},CLimit.prototype.getLimVelCmpdrCalc=function(){return`
		/**
 		 * Compress/Expands the velocity to be within the defined range
 		 *
 		 * @param {float} min minimum velocity magnitude
 		 * @param {float} max maximum velocity magnitude
  		 */
 		void limVelCmpdrCalc(float min, float max) {
 			float sqrLen = length(v_Velocity);
 			if (sqrLen < min) {
 				v_Velocity = normalize(v_Velocity) * min;
 			} else if (sqrLen > max) {
 				v_Velocity = normalize(v_Velocity) * max;
 			}
 		}
	`},CLimit.prototype.getCall=function(){switch(this.limitType){default:case LIM_NONE:return;case LIM_VOL:return this.getLimVolCall();case LIM_BALL_IN:return this.getLimBallInCall();case LIM_BALL_OUT:return this.getLimBallOutCall();case LIM_PLATE:return this.getLimPlateCall();case LIM_PLATE_HOLE:return this.getLimPlateHoleCall();case LIM_INF_PLANE:return this.getLimInfPlaneCall();case LIM_VORTEX:return this.getLimVortexCall();case LIM_COLOR_AGE:return this.getLimColorAgeCall();case LIM_COLOR_VEL:return this.getLimColorVelCall();case LIM_VEL_CMPDR:return this.getLimVelCmpdrCall()}},CLimit.prototype.getLimVolCall=function(){return"limVolCalc(u_limVol["+(this.id-1)+"].w2p, u_limVol["+(this.id-1)+"].pos, u_limVol["+(this.id-1)+"].dim, u_limVol["+(this.id-1)+"].len, u_limVol["+(this.id-1)+"].wid, u_limVol["+(this.id-1)+"].norm, u_limVol["+(this.id-1)+"].kres);\n"},CLimit.prototype.getLimBallInCall=function(){return"limBallInCalc(u_limBallIn["+(this.id-1)+"].pos, u_limBallIn["+(this.id-1)+"].r, u_limBallIn["+(this.id-1)+"].kres);\n"},CLimit.prototype.getLimBallOutCall=function(){return"limBallOutCalc(u_limBallOut["+(this.id-1)+"].pos, u_limBallOut["+(this.id-1)+"].r, u_limBallOut["+(this.id-1)+"].kres);\n"},CLimit.prototype.getLimPlateCall=function(){return"limPlateCalc(u_limPlate["+(this.id-1)+"].w2w, u_limPlate["+(this.id-1)+"].wc, u_limPlate["+(this.id-1)+"].norm, u_limPlate["+(this.id-1)+"].lMax, u_limPlate["+(this.id-1)+"].wMax, u_limPlate["+(this.id-1)+"].kres);\n"},CLimit.prototype.getLimPlateHoleCall=function(){return"limPlateHoleCalc(u_limPlateHole["+(this.id-1)+"].w2w, u_limPlateHole["+(this.id-1)+"].wc, u_limPlateHole["+(this.id-1)+"].norm, u_limPlateHole["+(this.id-1)+"].lMax, u_limPlateHole["+(this.id-1)+"].wMax, u_limPlateHole["+(this.id-1)+"].kres, u_limPlateHole["+(this.id-1)+"].r);\n"},CLimit.prototype.getLimInfPlaneCall=function(){return"limInfPlaneCalc(u_limInfPlane["+(this.id-1)+"].norm, u_limInfPlane["+(this.id-1)+"].kres);\n"},CLimit.prototype.getLimVortexCall=function(){return"limVortexCalc(u_limVortex["+(this.id-1)+"].base, u_limVortex["+(this.id-1)+"].axis, u_limVortex["+(this.id-1)+"].radius, u_limVortex["+(this.id-1)+"].height, u_limVortex["+(this.id-1)+"].freq, u_limVortex["+(this.id-1)+"].tight);\n"},CLimit.prototype.getLimColorAgeCall=function(){return"limColorAgeCalc("+this.mode+", u_limColorAge["+(this.id-1)+"].start, u_limColorAge["+(this.id-1)+"].range);\n"},CLimit.prototype.getLimColorVelCall=function(){return"limColorVelCalc(u_limColorVel["+(this.id-1)+"].offset);\n"},CLimit.prototype.getLimVelCmpdrCall=function(){return"limVelCmpdrCalc(u_limVelCmpdr["+(this.id-1)+"].min, u_limVelCmpdr["+(this.id-1)+"].max);\n"};