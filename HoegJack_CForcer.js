function CForcer(t,i,r,e,a,c,s,o,_){this.forceType=t,this.init(i,r,e,a,c,s,o,_),this.id=0}CForcer.prototype.init=function(t,i,r,e,a,c,s,o){switch(this.forceType){case F_GRAV_E:void 0!==t&&void 0!==i?this.initFGravE(t,i):this.initFGravE(9.832,[0,0,-1]);break;case F_GRAV_P:void 0!==t&&void 0!==i?this.initFGravP(t,i):this.initFGravP(1,0);break;case F_DRAG:void 0!==t?this.initFDrag(t):this.initFDrag(.15);break;case F_SPRING:void 0!==t&&void 0!==i?this.initFSpring(t,i,r,e,a):this.initFSpring(0,CPU_PART_MAXVAR);break;case F_SPRING_MESH:this.initFSpringMesh();break;case F_FLOCK:void 0!==t&&void 0!==i?this.initFFlock(t,i,r,e,a,c,s,o):this.initFFlock(2,10,10,15,20,90,150,1);break;case F_STATIC:void 0!==t&&void 0!==i?this.initFStatic(t,i):this.initFStatic([0,0,1],15);break;case F_FIELD:void 0!==t&&void 0!==i?this.initFField(t,i,r,e):this.initFField([0,0,0],5,5,2);default:case F_NONE:}},CForcer.prototype.initFGravE=function(t,i){this.grav_e=t,this.downDir=glMatrix.vec3.fromValues(i[0],i[1],i[2])},CForcer.prototype.initFGravP=function(t,i){this.grav_p=t,this.e0=0,this.r=2},CForcer.prototype.initFDrag=function(t){this.K_drag=t},CForcer.prototype.initFSpring=function(t,i,r,e,a){this.Ks=r,this.Ds=e,this.len_s=a,this.e0=t,this.e1=i},CForcer.prototype.initFSpringMesh=function(){this.strutInd=new UInt16Array,this.vertAng=new Float32Array},CForcer.prototype.initFFlock=function(t,i,r,e,a,c,s,o){this.Ka=t,this.Kv=i,this.Kc=r,this.R1=e,this.R2=a,this.frontal=glMatrix.glMatrix.toRadian(c),this.periph=glMatrix.glMatrix.toRadian(s),this.Ar=o},CForcer.prototype.initFStatic=function(t,i){this.dir=glMatrix.vec3.clone(t),glMatrix.vec3.normalize(this.dir,this.dir),glMatrix.vec3.scale(this.dir,this.dir,i)},CForcer.prototype.initFField=function(t,i,r,e){this.modelMat=glMatrix.mat4.create(),this.pos=glMatrix.vec3.clone(t),this.radius=i,this.strength=r,this.addAcc=e,this.vboContents=generator.sphere(t,i,24),this.iboContents=generator.sphereIndLS(24)},CForcer.prototype.calculate=function(t,i){switch(this.forceType){case F_GRAV_E:this.calcFGravE(t,i);break;case F_GRAV_P:this.calcFGravP(t,i);break;case F_DRAG:this.calcFDrag(t,i);break;case F_SPRING:this.calcFSpring(t,i);break;case F_SPRING_MESH:this.calcFSpringMesh(t,i);break;case F_FLOCK:this.calcFFlock(t,i);break;case F_STATIC:this.calcFStatic(t,i);break;case F_FIELD:this.calcFField(t,i);break;default:case F_NONE:}},CForcer.prototype.calcFGravE=function(t,i){var r=this.grav_e*t[i+CPU_PART_MASS];t[i+CPU_PART_X_FTOT]+=this.downDir[0]*r,t[i+CPU_PART_Y_FTOT]+=this.downDir[1]*r,t[i+CPU_PART_Z_FTOT]+=this.downDir[2]*r},CForcer.prototype.calcFGravP=function(t,i){var r,e;i!=this.e0&&(r=glMatrix.vec3.fromValues(t[this.e0+CPU_PART_XPOS]-t[i+CPU_PART_XPOS],t[this.e0+CPU_PART_YPOS]-t[i+CPU_PART_YPOS],t[this.e0+CPU_PART_ZPOS]-t[i+CPU_PART_ZPOS]),e=this.grav_p*t[this.e0+CPU_PART_MASS]*t[i+CPU_PART_MASS],e/=glMatrix.vec3.sqrLen(r)+this.r,e*=1/glMatrix.vec3.length(r),glMatrix.vec3.scale(r,r,e),t[i+CPU_PART_X_FTOT]+=r[0],t[i+CPU_PART_Y_FTOT]+=r[1],t[i+CPU_PART_Z_FTOT]+=r[2])},CForcer.prototype.calcFDrag=function(t,i){var r=t[i+CPU_PART_MASS]*this.K_drag;t[i+CPU_PART_X_FTOT]-=t[i+CPU_PART_XVEL]*r,t[i+CPU_PART_Y_FTOT]-=t[i+CPU_PART_YVEL]*r,t[i+CPU_PART_Z_FTOT]-=t[i+CPU_PART_ZVEL]*r},CForcer.prototype.calcFSpring=function(t,i){var r,e;i==this.e0&&(r=glMatrix.vec3.fromValues(t[this.e1+CPU_PART_XPOS]-t[this.e0+CPU_PART_XPOS],t[this.e1+CPU_PART_YPOS]-t[this.e0+CPU_PART_YPOS],t[this.e1+CPU_PART_ZPOS]-t[this.e0+CPU_PART_ZPOS]),e=glMatrix.vec3.len(r)-this.len_s,glMatrix.vec3.normalize(r,r),i=this.Ks*e,e=this.Ds,glMatrix.vec3.scale(r,r,i),t[this.e0+CPU_PART_X_FTOT]+=r[0]-e*t[this.e0+CPU_PART_XVEL],t[this.e0+CPU_PART_Y_FTOT]+=r[1]-e*t[this.e0+CPU_PART_YVEL],t[this.e0+CPU_PART_Z_FTOT]+=r[2]-e*t[this.e0+CPU_PART_ZVEL],t[this.e1+CPU_PART_X_FTOT]-=r[0]+e*t[this.e1+CPU_PART_XVEL],t[this.e1+CPU_PART_Y_FTOT]-=r[1]+e*t[this.e1+CPU_PART_YVEL],t[this.e1+CPU_PART_Z_FTOT]-=r[2]+e*t[this.e1+CPU_PART_ZVEL])},CForcer.prototype.calcFSpringMesh=function(t,i){},CForcer.prototype.calcFFlock=function(t,i){var r=glMatrix.vec3.create();r[0]=t[i+CPU_PART_XPOS],r[1]=t[i+CPU_PART_YPOS],r[2]=t[i+CPU_PART_ZPOS];var e=glMatrix.vec3.create();e[0]=t[i+CPU_PART_XVEL],e[1]=t[i+CPU_PART_YVEL],e[2]=t[i+CPU_PART_ZVEL];var a,c=this.Ar,s=glMatrix.vec3.create(),o=glMatrix.vec3.create(),_=glMatrix.vec3.create(),n=glMatrix.vec3.create(),l=glMatrix.vec3.create(),h=glMatrix.vec3.create(),F=glMatrix.vec3.create();for(j=0;j<t.length;j+=CPU_PART_MAXVAR)if(j!=i){l[0]=t[j+CPU_PART_XPOS],l[1]=t[j+CPU_PART_YPOS],l[2]=t[j+CPU_PART_ZPOS],h[0]=t[j+CPU_PART_XVEL],h[1]=t[j+CPU_PART_YVEL],h[2]=t[j+CPU_PART_ZVEL],glMatrix.vec3.subtract(F,l,r);var d,g=glMatrix.vec3.len(F);if(g<this.R1)a=1;else{if(!(g<=this.R2)){a=0;continue}a=(this.R2-g)/(this.R2-this.R1)}var P=Math.abs(glMatrix.vec3.angle(e,l));if(P<=this.frontal/2)d=1;else{if(!(P<=this.peripheral/2)){d=0;continue}d=(this.peripheral/2-P)/((this.peripheral-this.frontal)/2)}P=a*d;glMatrix.vec3.scaleAndAdd(n,n,F,P*this.Kc),glMatrix.vec3.normalize(F,F),glMatrix.vec3.scaleAndAdd(o,o,F,P*-this.Ka/g),glMatrix.vec3.subtract(h,h,e),glMatrix.vec3.scaleAndAdd(_,_,h,P*this.Kv)}var f=glMatrix.vec3.len(o);glMatrix.vec3.normalize(o,o),glMatrix.vec3.scale(o,o,Math.min(c,f)),glMatrix.vec3.add(s,s,o),c-=glMatrix.vec3.len(o),f=glMatrix.vec3.len(_),glMatrix.vec3.normalize(_,_),glMatrix.vec3.scale(_,_,Math.min(c,f)),glMatrix.vec3.add(s,s,_),c-=glMatrix.vec3.len(_),f=glMatrix.vec3.len(n),glMatrix.vec3.normalize(_,n),glMatrix.vec3.scale(n,n,Math.min(c,f)),glMatrix.vec3.add(s,s,n),glMatrix.vec3.scale(s,s,t[i+CPU_PART_MASS]),t[i+CPU_PART_X_FTOT]=s[0],t[i+CPU_PART_Y_FTOT]=s[1],t[i+CPU_PART_Z_FTOT]=s[2]},CForcer.prototype.calcFStatic=function(t,i){t[i+CPU_PART_X_FTOT]+=this.dir[0],t[i+CPU_PART_Y_FTOT]+=this.dir[1],t[i+CPU_PART_Z_FTOT]+=this.dir[2]},CForcer.prototype.calcFField=function(t,i){var r=glMatrix.vec3.fromValues(t[i+CPU_PART_XPOS],t[i+CPU_PART_YPOS],t[i+CPU_PART_ZPOS]),e=glMatrix.vec3.create();glMatrix.vec3.subtract(e,this.pos,r);var a=glMatrix.vec3.length(e);a>this.radius||this.strength<0&&a<1||(a=1/a,glMatrix.vec3.scale(e,e,a),r=glMatrix.vec3.create(),a=-this.strength*Math.pow(a,this.addAcc),glMatrix.vec3.scale(r,e,a*t[i+CPU_PART_MASS]),t[i+CPU_PART_X_FTOT]+=r[0],t[i+CPU_PART_Y_FTOT]+=r[1],t[i+CPU_PART_Z_FTOT]+=r[2])},CForcer.prototype.getStructs=function(){return`
		struct F_GRAV_E {
			vec3 downDir;
			float acc;
		};
		
		struct F_DRAG {
			float K_drag;
		};
		
		struct F_STATIC {
			vec3 dir;
		};
		
		struct F_FIELD {
			vec3 pos;
			float radius;
			float strength;
			float addAcc;
		};
	`},CForcer.prototype.getUniforms=function(t){if(t!=this.id)return"";var i="";switch(this.forceType){case F_GRAV_E:i+="uniform F_GRAV_E u_fGravE["+t+"];\n";break;case F_DRAG:i+="uniform F_DRAG u_fDrag["+t+"];\n";break;case F_STATIC:i+="uniform F_STATIC u_fStatic["+t+"];\n";break;case F_FIELD:i+="uniform F_FIELD u_fField["+t+"];\n"}return i},CForcer.prototype.getUniformLocations=function(t){switch(this.forceType){case F_GRAV_E:this.u_downDir=gl.getUniformLocation(t,"u_fGravE["+(this.id-1)+"].downDir"),this.u_acc=gl.getUniformLocation(t,"u_fGravE["+(this.id-1)+"].acc");break;case F_DRAG:this.u_kDrag=gl.getUniformLocation(t,"u_fDrag["+(this.id-1)+"].K_drag");break;case F_STATIC:this.u_dir=gl.getUniformLocation(t,"u_fStatic["+(this.id-1)+"].dir");break;case F_FIELD:this.u_pos=gl.getUniformLocation(t,"u_fField["+(this.id-1)+"].pos"),this.u_radius=gl.getUniformLocation(t,"u_fField["+(this.id-1)+"].radius"),this.u_strength=gl.getUniformLocation(t,"u_fField["+(this.id-1)+"].strength"),this.u_addAcc=gl.getUniformLocation(t,"u_fField["+(this.id-1)+"].addAcc")}},CForcer.prototype.bindUniforms=function(){switch(this.forceType){case F_GRAV_E:gl.uniform3fv(this.u_downDir,this.downDir),gl.uniform1f(this.u_acc,this.grav_e);break;case F_DRAG:gl.uniform1f(this.u_kDrag,this.K_drag);break;case F_STATIC:gl.uniform3fv(this.u_dir,this.dir);break;case F_FIELD:gl.uniform3fv(this.u_pos,this.pos),gl.uniform1f(this.u_radius,this.radius),gl.uniform1f(this.u_strength,this.strength),gl.uniform1f(this.u_addAcc,this.addAcc)}},CForcer.prototype.getCalc=function(){switch(this.forceType){default:case F_SPRING:case F_SPRING_MESH:case F_NONE:return"";case F_GRAV_E:return this.getFGraveECalc();case F_DRAG:return this.getFDragCalc();case F_STATIC:return this.getFStaticCalc();case F_FIELD:return this.getFFieldCalc()}},CForcer.prototype.getFGraveECalc=function(){return`
		/**
		 * Calculates force of gravity
		 *
		 * @param {vec3} downDir downward direction vector
		 * @param {float} acc acceleration due to gravity
		 */
		void fGravECalc(vec3 downDir, float acc) {
			float force = acc * a_Mass;
			v_Ftot += downDir * force;
		}
	`},CForcer.prototype.getFDragCalc=function(){return`
		/**
		 * Calculates force of drag
		 *
		 * @param {int} mode tells whether to use in or out values
		 * @param {float} K_drag coefficient of drag
		 */
		void fDragCalc(int mode, float K_drag) {
			float mass_drag = a_Mass * K_drag;
			if (mode == 0)
				v_Ftot -= a_Velocity * mass_drag;
			else
				v_Ftot -= v_Velocity * mass_drag;
		}
	`},CForcer.prototype.getFStaticCalc=function(){return`
		/**
		 * Calculates force of drag
		 *
		 * @param {vec3} dir direction and magnitude of force
		 */
		void fStaticCalc(vec3 dir) {
			v_Ftot += dir;
		}
	`},CForcer.prototype.getFFieldCalc=function(){return`
		/**
		 * Calculates force of drag
		 *
		 * @param {vec3} dir direction and magnitude of force
		 */
		void fFieldCalc(vec3 pos, float radius, float strength, float addAcc) {
			vec3 diff = pos - a_Position;
			float dist = length(diff);
			
			if (dist > radius || (strength < 0.0 && dist < 10.0))
				return;
			
			dist = 1.0 / dist;
			diff *= dist;
			
			diff *= -strength * pow(dist, addAcc);
			
			v_Ftot += diff;
		}
	`},CForcer.prototype.getCall=function(){switch(this.forceType){default:case F_NONE:return"";case F_GRAV_E:return this.getFGravECall();case F_DRAG:return this.getFDragCall();case F_STATIC:return this.getFStaticCall();case F_FIELD:return this.getFFieldCall()}},CForcer.prototype.getFGravECall=function(){return"fGravECalc(u_fGravE["+(this.id-1)+"].downDir, u_fGravE["+(this.id-1)+"].acc);\n\t\t\t"},CForcer.prototype.getFDragCall=function(){return"fDragCalc(mode,  u_fDrag["+(this.id-1)+"].K_drag);\n"},CForcer.prototype.getFStaticCall=function(){return"fStaticCalc(u_fStatic["+(this.id-1)+"].dir);\n"},CForcer.prototype.getFFieldCall=function(){return"fFieldCalc(u_fField["+(this.id-1)+"].pos, u_fField["+(this.id-1)+"].radius, u_fField["+(this.id-1)+"].strength, u_fField["+(this.id-1)+"].addAcc);\n"};