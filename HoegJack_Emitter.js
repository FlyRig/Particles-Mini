function Emitter(e,t,i,a,n){this.emitType=e,this.xDirRange=glMatrix.vec2.fromValues(-1,1),this.yDirRange=glMatrix.vec2.fromValues(-1,1),this.zDirRange=glMatrix.vec2.fromValues(-1,1),this.dirRange=glMatrix.vec3.fromValues(2,2,2),this.velRange=glMatrix.vec2.fromValues(.5,2),this.massRange=glMatrix.vec2.fromValues(2,5),this.lifeRange=glMatrix.vec2.fromValues(2,5),this.hueRange=glMatrix.vec2.fromValues(0,360),this.satRange=glMatrix.vec2.fromValues(.5,1),this.intRange=glMatrix.vec2.fromValues(1,1),this.lifeRand=!0,this.velRand=!0,this.massRand=!0,this.hueRand=!0,this.satRand=!0,this.intRand=!1,this.init(t,i,a,n)}Emitter.prototype.init=function(e,t,i,a){switch(this.emitType){default:case E_VOL:void 0!==e&&void 0!==t?this.initVol(e,t):this.initVol([0,0,5],[2,2,4]);break;case E_POINT:void 0!==e?this.initPoint(e):this.initPoint([0,0,5]);break;case E_SPHERE:void 0!==e&&void 0!==t?this.initSphere(e,t):this.initSphere([0,0,5],1);break;case E_DISC:void 0!==e&&void 0!==t?this.initDisc(e,t,i):this.initDisc([0,0,5],[0,0,1],2);break;case E_RECT:void 0!==e&&void 0!==t?this.initRect(e,t,i,a):this.initRect([0,0,5],[0,0,1],2,2)}},Emitter.prototype.initVol=function(e,t){this.pos=glMatrix.vec3.clone(e),this.dim=glMatrix.vec3.clone(t),this.xRange=glMatrix.vec2.fromValues(-this.dim[0]/2,this.dim[0]/2),this.yRange=glMatrix.vec2.fromValues(-this.dim[1]/2,this.dim[1]/2),this.zRange=glMatrix.vec2.fromValues(-this.dim[2]/2,this.dim[2]/2)},Emitter.prototype.initPoint=function(e){this.pos=glMatrix.vec3.clone(e)},Emitter.prototype.initSphere=function(e,t){this.pos=glMatrix.vec3.clone(e),this.radius=t},Emitter.prototype.initDisc=function(e,t,i){this.pos=glMatrix.vec3.clone(e),this.norm=glMatrix.vec3.clone(t),glMatrix.vec3.normalize(this.norm,this.norm),this.radius=i,this.rotQuat=glMatrix.quat.create(),glMatrix.quat.rotationTo(this.rotQuat,[0,0,1],this.norm)},Emitter.prototype.initRect=function(e,t,i,a){this.pos=glMatrix.vec3.clone(e),this.norm=glMatrix.vec3.clone(t),glMatrix.vec3.normalize(this.norm,this.norm),this.wid=i,this.len=a,this.rotQuat=glMatrix.quat.create(),glMatrix.quat.rotationTo(this.rotQuat,[0,0,1],this.norm),console.log(this.rotQuat)},Emitter.prototype.constrainDirection=function(e,t,i){"Array"==typeof e?(this.xDirRange[0]=e[0],this.xDirRange[1]=e[1],this.dirRange[0]=this.xDirRange[1]-this.xDirRange[0],"Array"==typeof t&&(this.yDirRange[0]=t[0],this.yDirRange[1]=t[1],this.dirRange[1]=this.yDirRange[1]-this.yDirRange[0],"Array"==typeof i&&(this.zDirRange[0]=i[0],this.zDirRange[1]=i[1],this.dirRange[2]=this.zDirRange[1]-this.zDirRange[0]))):"Number"==typeof e&&(0==e?(this.xDirRange[0]=t[0],this.xDirRange[1]=t[1],this.dirRange[0]=this.xDirRange[1]-this.xDirRange[0]):1==e?(this.yDirRange[0]=t[0],this.yDirRange[1]=t[1],this.dirRange[1]=this.yDirRange[1]-this.yDirRange[0]):(this.zDirRange[0]=t[0],this.zDirRange[1]=t[1],this.dirRange[2]=this.zDirRange[1]-this.zDirRange[0]))},Emitter.prototype.setRange=function(e,t){var i;switch(e){default:return;case CPU_PART_LIFE:i=this.lifeRange,this.lifeRand;break;case CPU_PART_XVEL:case CPU_PART_YVEL:case CPU_PART_ZVEL:i=this.velRange,this.velRand;break;case CPU_PART_MASS:i=this.massRange,this.massRand;break;case CPU_PART_HUE:i=this.hueRange,this.hueRand;break;case CPU_PART_SAT:i=this.satRange,this.satRand;break;case CPU_PART_INT:i=this.intRange,this.intRand}i[0]=t[0],i[1]=t[1],t[0],t[1]},Emitter.prototype.makeParticle=function(e,t){switch(!(e[t+PART_AGE]=0)===this.lifeRand?e[t+PART_LIFE]=this.randRange(this.lifeRange):e[t+PART_LIFE]=this.lifeRange[0],this.emitType){case E_POINT:this.makePartPoint(e,t);break;default:case E_VOL:this.makePartVol(e,t);break;case E_SPHERE:this.makePartSphere(e,t);break;case E_DISC:this.makePartDisc(e,t);break;case E_RECT:this.makePartRect(e,t)}var i=new Float32Array(3);!0===this.velRand?i=this.randVecRand(this.velRange):(i[0]=this.velRange[0],i[1]=this.velRange[0],i[2]=this.velRange[0]),e[t+PART_XVEL]=i[0],e[t+PART_YVEL]=i[1],e[t+PART_ZVEL]=i[2],!0===this.massRand?e[t+PART_MASS]=this.randRange(this.massRange):e[t+PART_MASS]=this.massRange[0],!0===this.hueRand?e[t+PART_HUE]=this.randRange(this.hueRange):e[t+PART_HUE]=this.hueRange[0],!0===this.satRand?e[t+PART_SAT]=this.randRange(this.satRange):e[t+PART_SAT]=this.satRange[0],!0===this.intRand?e[t+PART_INT]=this.randRange(this.intRange):e[t+PART_INT]=this.intRange[0]},Emitter.prototype.makePartPoint=function(e,t){e[t+PART_XPOS]=this.pos[0],e[t+PART_YPOS]=this.pos[1],e[t+PART_ZPOS]=this.pos[2]},Emitter.prototype.makePartVol=function(e,t){e[t+PART_XPOS]=this.pos[0]+this.randRange(this.xRange),e[t+PART_YPOS]=this.pos[1]+this.randRange(this.yRange),e[t+PART_ZPOS]=this.pos[2]+this.randRange(this.zRange)},Emitter.prototype.makePartSphere=function(e,t){var i=this.randVecRand([0,this.radius]);e[t+PART_XPOS]=i[0]+this.pos[0],e[t+PART_YPOS]=i[1]+this.pos[1],e[t+PART_ZPOS]=i[2]+this.pos[2]},Emitter.prototype.makePartDisc=function(e,t){var i=glMatrix.vec3.create();glMatrix.vec2.random(i,this.randRange([0,this.radius])),glMatrix.vec3.transformQuat(i,i,this.rotQuat),e[t+PART_XPOS]=this.pos[0]+i[0],e[t+PART_YPOS]=this.pos[1]+i[1],e[t+PART_ZPOS]=this.pos[2]+i[2]},Emitter.prototype.makePartRect=function(e,t){var i=glMatrix.vec3.create();i[0]=this.randRange([-this.wid/2,this.wid/2]),i[1]=this.randRange([-this.len/2,this.len/2]),glMatrix.vec3.transformQuat(i,i,this.rotQuat),e[t+PART_XPOS]=this.pos[0]+i[0],e[t+PART_YPOS]=this.pos[1]+i[1],e[t+PART_ZPOS]=this.pos[2]+i[2]},Emitter.prototype.getUniforms=function(){var e=`
		uniform vec2 u_eVelRange;
		uniform vec2 u_eMassRange;
		uniform vec2 u_eLifeRange;
		uniform vec2 u_eHueRange;
		uniform vec2 u_eSatRange;
		uniform vec2 u_eIntRange;
	`;switch(this.emitType){case E_VOL:e+=`
				uniform vec2 u_eXRange;
				uniform vec2 u_eYRange;
				uniform vec2 u_eZRange;
			`;case E_POINT:e+="uniform vec3 u_ePos;";break;case E_SPHERE:e+=`
				uniform vec3 u_ePos;
				uniform float u_eRadius;
			`}return e},Emitter.prototype.getUniformLocations=function(e){if(this.u_eVelRange=gl.getUniformLocation(e,"u_eVelRange"),this.u_eVelRange<0)return console.log(this.constructor.name+".getUniformLocation() Failed to get GPU location of uniform u_eVelRange"),-1;if(this.u_eMassRange=gl.getUniformLocation(e,"u_eMassRange"),this.u_eVelRange<0)return console.log(this.constructor.name+".getUniformLocation() Failed to get GPU location of uniform u_eMassRange"),-1;if(this.u_eLifeRange=gl.getUniformLocation(e,"u_eLifeRange"),this.u_eLifeRange<0)return console.log(this.constructor.name+".getUniformLocation() Failed to get GPU location of uniform u_eLifeRange"),-1;if(this.u_eHueRange=gl.getUniformLocation(e,"u_eHueRange"),this.u_eHueRange<0)return console.log(this.constructor.name+".getUniformLocation() Failed to get GPU location of uniform u_eHueRange"),-1;if(this.u_eSatRange=gl.getUniformLocation(e,"u_eSatRange"),this.u_eVelRange<0)return console.log(this.constructor.name+".getUniformLocation() Failed to get GPU location of uniform u_eSatRange"),-1;if(this.u_eIntRange=gl.getUniformLocation(e,"u_eIntRange"),this.u_eIntRange<0)return console.log(this.constructor.name+".getUniformLocation() Failed to get GPU location of uniform u_eIntRange"),-1;switch(this.emitType){case E_VOL:if(this.u_eXRange=gl.getUniformLocation(e,"u_eXRange"),this.u_eXRange<0)return console.log(this.constructor.name+".getUniformLocation() Failed to get GPU location of uniform u_eXRange"),-1;if(this.u_eYRange=gl.getUniformLocation(e,"u_eYRange"),this.u_eYRange<0)return console.log(this.constructor.name+".getUniformLocation() Failed to get GPU location of uniform u_eYRange"),-1;if(this.u_eZRange=gl.getUniformLocation(e,"u_eZRange"),this.u_eZRange<0)return console.log(this.constructor.name+".getUniformLocation() Failed to get GPU location of uniform u_eZRange"),-1;case E_POINT:if(this.u_ePos=gl.getUniformLocation(e,"u_ePos"),this.u_ePos<0)return console.log(this.constructor.name+".getUniformLocation() Failed to get GPU location of uniform u_ePos"),-1;break;case E_SPHERE:if(this.u_ePos=gl.getUniformLocation(e,"u_ePos"),this.u_ePos<0)return console.log(this.constructor.name+".getUniformLocation() Failed to get GPU location of uniform u_ePos"),-1;if(this.u_eRad=gl.getUniformLocation(e,"u_eRadius"),this.u_eRad<0)return console.log(this.constructor.name+".getUniformLocation() Failed to get GPU location of uniform u_eRadius"),-1}},Emitter.prototype.bindUniforms=function(){switch(gl.uniform2fv(this.u_eVelRange,this.velRange),gl.uniform2fv(this.u_eMassRange,this.massRange),gl.uniform2fv(this.u_eLifeRange,this.lifeRange),gl.uniform2fv(this.u_eHueRange,this.hueRange),gl.uniform2fv(this.u_eSatRange,this.satRange),gl.uniform2fv(this.u_eIntRange,this.intRange),this.emitType){case E_VOL:gl.uniform2fv(this.u_eXRange,this.xRange),gl.uniform2fv(this.u_eYRange,this.yRange),gl.uniform2fv(this.u_eZRange,this.zRange);case E_POINT:gl.uniform3fv(this.u_ePos,this.pos);break;case E_SPHERE:gl.uniform3fv(this.u_ePos,this.pos),gl.uniform1f(this.u_eRad,this.radius)}},Emitter.prototype.getMakeParticle=function(){switch(this.emitType){case E_POINT:return this.getEPoint();default:case E_VOL:return this.getEVol();case E_SPHERE:return this.getESphere()}},Emitter.prototype.getEPoint=function(){return`
		/**
		 * Makes a new particle from point emitter
		 *
		 */
		void makeParticlePoint() {			
			v_Position = u_ePos;
			float velMag = rand(vec2(v_Position.y, a_Position.z)) * (u_eVelRange.y - u_eVelRange.x) + u_eVelRange.x;
			v_Velocity = randVec(velMag);
			
			v_Mass = rand(vec2(a_Mass, a_Position.y)) * (u_eMassRange.y - u_eMassRange.x) + u_eMassRange.x;
			v_Age = 0.0;
			v_Life = rand(vec2(v_Mass, v_Velocity.y)) * (u_eLifeRange.y - u_eLifeRange.x) + u_eLifeRange.x;
			
			v_HSI.r = rand(vec2(v_Life, v_Position.x)) * (u_eHueRange.y - u_eHueRange.x) + u_eHueRange.x;
			v_HSI.g = rand(vec2(v_Life, v_HSI.r)) * (u_eSatRange.y - u_eSatRange.x) + u_eSatRange.x;
			v_HSI.b = rand(vec2(v_Position.z, v_HSI.r)) * (u_eIntRange.y - u_eIntRange.x) + u_eIntRange.x;
		}
	`},Emitter.prototype.getEVol=function(){return`
		/**
		 * Makes a new Particle from volume emitter
		 *
		 */
		void makeParticleVol() {
			float xRand = rand(a_Position.yz) * (u_eXRange.y - u_eXRange.x) + u_eXRange.x;
			float yRand = rand(a_Position.xz) * (u_eYRange.y - u_eYRange.x) + u_eYRange.x;
			float zRand = rand(a_Position.xy) * (u_eZRange.y - u_eZRange.x) + u_eZRange.x;
			
			v_Position = u_ePos + vec3(xRand, yRand, zRand);
			float velMag = rand(vec2(v_Position.y, a_Position.z)) * (u_eVelRange.y - u_eVelRange.x) + u_eVelRange.x;
			v_Velocity = randVec(velMag);
			
			v_Mass = rand(vec2(a_Mass, a_Position.y)) * (u_eMassRange.y - u_eMassRange.x) + u_eMassRange.x;
			v_Age = 0.0;
			v_Life = rand(vec2(v_Mass, v_Velocity.y)) * (u_eLifeRange.y - u_eLifeRange.x) + u_eLifeRange.x;
			
			v_HSI.r = rand(vec2(v_Life, v_Position.x)) * (u_eHueRange.y - u_eHueRange.x) + u_eHueRange.x;
			v_HSI.g = rand(vec2(v_Life, v_HSI.r)) * (u_eSatRange.y - u_eSatRange.x) + u_eSatRange.x;
			v_HSI.b = rand(vec2(v_Position.z, v_HSI.r)) * (u_eIntRange.y - u_eIntRange.x) + u_eIntRange.x;
		}
	`},Emitter.prototype.getESphere=function(){return`
		/**
		 * Makes a new Particle from volume emitter
		 *
		 */
		void makeParticleSphere() {
			v_Position = randVec(rand(vec2(a_Position.z, a_Position.x)) * u_eRadius) + u_ePos;
			float velMag = rand(vec2(v_Position.y, a_Position.z)) * (u_eVelRange.y - u_eVelRange.x) + u_eVelRange.x;
			v_Velocity = randVec(velMag);
			
			v_Mass = rand(vec2(a_Mass, a_Position.y)) * (u_eMassRange.y - u_eMassRange.x) + u_eMassRange.x;
			v_Age = 0.0;
			v_Life = rand(vec2(v_Mass, v_Velocity.y)) * (u_eLifeRange.y - u_eLifeRange.x) + u_eLifeRange.x;
			
			v_HSI.r = rand(vec2(v_Life, v_Position.x)) * (u_eHueRange.y - u_eHueRange.x) + u_eHueRange.x;
			v_HSI.g = rand(vec2(v_Life, v_HSI.r)) * (u_eSatRange.y - u_eSatRange.x) + u_eSatRange.x;
			v_HSI.b = rand(vec2(v_Position.z, v_HSI.r)) * (u_eIntRange.y - u_eIntRange.x) + u_eIntRange.x;
		}
	`},Emitter.prototype.getEmitterCall=function(){switch(this.emitType){case E_POINT:return this.getEPointCall();default:case E_VOL:return this.getEVolCall();case E_SPHERE:return this.getESphereCall()}},Emitter.prototype.getEPointCall=function(){return"makeParticlePoint();\n"},Emitter.prototype.getEVolCall=function(){return"makeParticleVol();\n"},Emitter.prototype.getESphereCall=function(){return"makeParticleSphere();\n"},Emitter.prototype.randRange=function(e){return Math.random()*(e[1]-e[0])+e[0]},Emitter.prototype.randVecRand=function(e){var t=glMatrix.vec3.create;return glMatrix.vec3.random(t,this.randRange(e)),t},Emitter.prototype.randVec=function(e){var t=glMatrix.vec3.create();return glMatrix.vec3.random(t,e),t};