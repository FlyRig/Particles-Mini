function PartSys(t){this.transformVaryings=["v_Age","v_Life","v_Position","v_Velocity","v_Acc","v_Mass","v_HSI"],this.hybridVaryings=["v_Age","v_Life","v_Position","v_Velocity","v_Acc","v_Mass","v_HSI","v_Ftot"],this.sysType=SYS_GPU,this.vboLoc,this.shaderLoc,this.modelMat=glMatrix.mat4.create(),this.u_MvpMatLoc,this.partCount=t,this.s1,this.s1dot,this.s2,this.forceList=[],this.limitList=[],this.sInd=this.partCount*PART_MAXVAR,this.drawCon=!0,this.aging=!1,this.isNudge=!1,this.orb=!0,this.blend=!1,this.solverType=SOLV_EULER,this.fCount=new Uint8Array(F_MAXVAR),this.lCount=new Uint8Array(LIM_MAXVAR)}PartSys.prototype.setName=function(t){this.name=t},PartSys.prototype.compileShader=function(){if(this.VSHADER_SOURCE=this.getVShader(),this.FSHADER_SOURCE=this.getFShader(),this.sysType===SYS_CPU?this.shaderLoc=createProgram(gl,this.VSHADER_SOURCE,this.FSHADER_SOURCE):this.sysType===SYS_GPU?this.shaderLoc=createProgram(gl,this.VSHADER_SOURCE,this.FSHADER_SOURCE,this.transformVaryings):this.sysType===SYS_HYBRID&&(this.shaderLoc=createProgram(gl,this.VSHADER_SOURCE,this.FSHADER_SOURCE,this.hybridVaryings)),this.shaderLoc){gl.program=this.shaderLoc;var t=gl.getAttribLocation(this.shaderLoc,"a_Position");if(t<0)return console.log(this.constructor.name+".init() Failed to get GPU location of attribute a_Position"),-1;var e=gl.getAttribLocation(this.shaderLoc,"a_Mass");if(e<0)return console.log(this.constructor.name+".init() Failed to get GPU location of attribute a_Mass"),-1;var s,o,r,_,P,a,n,l,A=gl.getAttribLocation(this.shaderLoc,"a_HSI");if(A<0)return console.log(this.constructor.name+".init() Failed to get GPU location of attribute a_HSI"),-1;if(this.sysType!=SYS_CPU){if((s=gl.getAttribLocation(this.shaderLoc,"a_Age"))<0)return console.log(this.constructor.name+".init() Failed to get GPU location of attribute a_Age"),-1;if(o=gl.getAttribLocation(this.shaderLoc,"a_Life"),s<0)return console.log(this.constructor.name+".init() Failed to get GPU location of attribute a_Life"),-1;if((r=gl.getAttribLocation(this.shaderLoc,"a_Velocity"))<0)return console.log(this.constructor.name+".init() Failed to get GPU location of attribute a_Velocity"),-1;if((_=gl.getAttribLocation(this.shaderLoc,"a_Acc"))<0)return console.log(this.constructor.name+".init() Failed to get GPU location of attribute a_Acc"),-1;if(this.sysType!=SYS_GPU&&(P=gl.getAttribLocation(this.shaderLoc,"a_Ftot"))<0)return console.log(this.constructor.name+".init() Failed to get GPU location of attribute a_Ftot"),-1;if(this.u_isAging=gl.getUniformLocation(this.shaderLoc,"u_isAging"),this.u_isAging<0)return console.log(this.constructor.name+".init() Failed to get GPU location of uniform u_isAging"),-1;if(this.u_isNudge=gl.getUniformLocation(this.shaderLoc,"u_isNudge"),this.u_isNudge<0)return console.log(this.constructor.name+".init() Failed to get GPU location of uniform u_isNudge"),-1;if(this.u_timeStep=gl.getUniformLocation(this.shaderLoc,"u_timeStep"),this.u_timeStep<0)return console.log(this.constructor.name+".init() Failed to get GPU location of uniform u_timeStep"),-1;if(this.u_solver=gl.getUniformLocation(this.shaderLoc,"u_solver"),this.u_solver<0)return console.log(this.constructor.name+".init() Failed to get GPU location of uniform u_solver"),-1;for(this.emit.getUniformLocations(this.shaderLoc),i=0;i<this.forceList.length;i++)this.forceList[i].getUniformLocations(this.shaderLoc);for(i=0;i<this.limitList.length;i++)this.limitList[i].getUniformLocations(this.shaderLoc)}if(this.u_runModeID=gl.getUniformLocation(this.shaderLoc,"u_runMode"),this.u_runModeID<0)return console.log(this.constructor.name+".init() Failed to get GPU location of uniform u_runModeID"),-1;this.u_MvpMatLoc=gl.getUniformLocation(this.shaderLoc,"u_MvpMatrix"),this.u_MvpMatLoc?(this.vaoLoc=gl.createVertexArray(),gl.bindVertexArray(this.vaoLoc),this.vboLoc=gl.createBuffer(),this.vboLoc?(gl.bindBuffer(gl.ARRAY_BUFFER,this.vboLoc),this.sysType===SYS_GPU?gl.bufferData(gl.ARRAY_BUFFER,this.s1,gl.STREAM_READ):gl.bufferData(gl.ARRAY_BUFFER,this.s1,gl.STREAM_DRAW),a=this.s1.BYTES_PER_ELEMENT,n=this.s1.length*a/this.partCount,l=PART_XPOS*a,gl.enableVertexAttribArray(t),gl.vertexAttribPointer(t,3,gl.FLOAT,!1,n,l),l=PART_MASS*a,gl.enableVertexAttribArray(e),gl.vertexAttribPointer(e,1,gl.FLOAT,!1,n,l),l=PART_HUE*a,gl.enableVertexAttribArray(A),gl.vertexAttribPointer(A,3,gl.FLOAT,!1,n,l),this.sysType!=SYS_CPU&&(l=PART_AGE*a,gl.enableVertexAttribArray(s),gl.vertexAttribPointer(s,1,gl.FLOAT,!1,n,l),l=PART_LIFE*a,gl.enableVertexAttribArray(o),gl.vertexAttribPointer(o,1,gl.FLOAT,!1,n,l),l=PART_XVEL*a,gl.enableVertexAttribArray(r),gl.vertexAttribPointer(r,3,gl.FLOAT,!1,n,l),l=PART_XACC*a,gl.enableVertexAttribArray(_),gl.vertexAttribPointer(_,3,gl.FLOAT,!1,n,l),this.sysType===SYS_HYBRID&&(l=CPU_PART_X_FTOT*a,gl.enableVertexAttribArray(P),gl.vertexAttribPointer(P,3,gl.FLOAT,!1,n,l))),gl.bindVertexArray(null),this.sysType!=SYS_CPU&&(this.vboOut=gl.createBuffer(),gl.bindBuffer(gl.ARRAY_BUFFER,this.vboOut),gl.bufferData(gl.ARRAY_BUFFER,this.s1.length*a,gl.STREAM_READ)),this.sysType===SYS_GPU&&delete this.s1,needRefresh=!0):console.log(this.constructor.name+".init() failed to create VBO in GPU. Bye!")):console.log(this.constructor.name+".init() failed to get GPU location for u_MvpMatrix uniform")}else console.log(this.constructor.name+".init() failed to create executable Shaders on the GPU. Bye!")},PartSys.prototype.pickSys=function(){var t=[];for(i=0;i<this.forceList.length;i++)switch(this.forceList[i].forceType){default:case F_NONE:case F_GRAV_E:case F_DRAG:break;case F_SPRING:case F_SPRING_MESH:case F_FLOCK:case F_GRAV_P:t.push(i)}0<t.length&&this.sysType!=SYS_CPU&&(this.sysType=SYS_HYBRID,this.hybForces=new Uint16Array(t)),this.sysType!=SYS_GPU&&(this.sInd=this.partCount*CPU_PART_MAXVAR,this.s1dot=new Float32Array(this.sInd),this.s2=new Float32Array(this.sInd),this.sM=new Float32Array(this.sInd),this.sMdot=new Float32Array(this.sInd)),this.s1=new Float32Array(this.sInd)},PartSys.prototype.initEmitter=function(t,i,e,s,o){this.eType=t,this.emit=new Emitter(t,i,e,s,o)},PartSys.prototype.initParticles=function(){if(this.sysType===SYS_GPU)for(i=0;i<this.sInd;i+=PART_MAXVAR)this.emit.makeParticle(this.s1,i),this.s1[i+PART_AGE]+=this.emit.lifeRange[0];else{for(i=0;i<this.sInd;i+=CPU_PART_MAXVAR)this.emit.makeParticle(this.s1,i),this.s1[i+PART_AGE]+=this.emit.lifeRange[0];this.s2=Float32Array.from(this.s1)}},PartSys.prototype.makeParticle=function(t,i){this.emit.makeParticle(t,i)},PartSys.prototype.addForce=function(t,i,e,s,o,r,_,P,a){a=new CForcer(t,i,e,s,o,r,_,P,a);this.forceList.push(a),this.fCount[t]++},PartSys.prototype.addLimit=function(t,i,e,s,o,r,_){_=new CLimit(t,i,e,s,o,r,_);this.limitList.push(_),this.lCount[t]++},PartSys.prototype.applyAllForces=function(t,e){for(i=0;i<this.sInd;i+=CPU_PART_MAXVAR)t[i+CPU_PART_X_FTOT]=0,t[i+CPU_PART_Y_FTOT]=0,t[i+CPU_PART_Z_FTOT]=0;for(i=0;i<this.sInd;i+=CPU_PART_MAXVAR){var s;for(!0===this.isNudge&&(s=glMatrix.vec3.create(),glMatrix.vec3.random(s,4),this.s2[i+PART_XVEL]+=s[0],this.s2[i+PART_YVEL]+=s[1],this.s2[i+PART_ZVEL]+=s[2]),j=0;j<e.length;j++)e[j].calculate(t,i)}},PartSys.prototype.applyCPUForces=function(t,e,s){for(i=0;i<this.sInd;i+=CPU_PART_MAXVAR)for(j=0;j<s.length;j++)e[s[j]].calculate(t,i)},PartSys.prototype.applyAllForcesInd=function(t,e,s){for(t[s+CPU_PART_X_FTOT]=0,t[s+CPU_PART_Y_FTOT]=0,t[i+CPU_PART_Z_FTOT]=0,j=0;j<e.length;j++)e[j].calculate(t,i)},PartSys.prototype.dotFinder=function(t,e){for(i=0;i<this.sInd;i+=CPU_PART_MAXVAR)e[i+CPU_PART_AGE]=1,e[i+CPU_PART_XPOS]=t[i+CPU_PART_XVEL],e[i+CPU_PART_YPOS]=t[i+CPU_PART_YVEL],e[i+CPU_PART_ZPOS]=t[i+CPU_PART_ZVEL],e[i+CPU_PART_XVEL]=t[i+CPU_PART_X_FTOT]/t[i+CPU_PART_MASS],e[i+CPU_PART_YVEL]=t[i+CPU_PART_Y_FTOT]/t[i+CPU_PART_MASS],e[i+CPU_PART_ZVEL]=t[i+CPU_PART_Z_FTOT]/t[i+CPU_PART_MASS]},PartSys.prototype.solver=function(t,i){var e=Float32Array.from(t);switch(this.solverType){case SOLV_EULER:this.eulerSolver(t,i,e,g_timeStep);break;case SOLV_MIDPOINT:this.midpointSolver(t,i,e,g_timeStep);break;default:case SOLV_VEL_VERLET:this.velVerletSolver(t,i,e,g_timeStep);break;case SOLV_BACK_EULER:this.backEulerSolver(t,i,e,g_timeStep);break;case SOLV_BACK_MIDPT:this.backMidpointSolver(t,i,e,g_timeStep);break;case SOLV_SYMP_EULER:this.symplecticEulerSolver(t,i,e,g_timeStep)}return e},PartSys.prototype.doConstraint=function(t,e,s){for(i=0;i<this.sInd;i+=CPU_PART_MAXVAR)for(j=0;j<s.length;j++)s[j].calculate(t,e,i)},PartSys.prototype.render=function(){gl.useProgram(this.shaderLoc),gl.bindBuffer(gl.ARRAY_BUFFER,this.vboLoc),gl.bufferSubData(gl.ARRAY_BUFFER,0,this.s2)},PartSys.prototype.swap=function(){this.s1=this.s2},PartSys.prototype.nudge=function(){this.isNudge=!0},PartSys.prototype.draw=function(t){if(!0===this.hybApply?this.applyCPUForces(this.s1,this.forceList,this.hybForces):this.sysType===SYS_CPU&&1<g_runMode&&(this.applyAllForces(this.s1,this.forceList),this.dotFinder(this.s1,this.s1dot),this.s2=this.solver(this.s1,this.s1dot),this.doConstraint(this.s1,this.s2,this.limitList)),gl.useProgram(this.shaderLoc),gl.bindVertexArray(this.vaoLoc),gl.bindBuffer(gl.ARRAY_BUFFER,this.vboLoc),!0===this.hybApply&&(gl.bufferSubData(gl.ARRAY_BUFFER,0,this.s1),this.hybApply=!1),gl.uniform1i(this.u_runModeID,g_runMode),gl.uniformMatrix4fv(this.u_MvpMatLoc,!1,t.mvp),this.sysType!=SYS_CPU){for(gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER,0,this.vboOut),gl.uniform1i(this.u_isAging,this.aging),gl.uniform1i(this.u_isNudge,this.isNudge),gl.uniform1f(this.u_timeStep,g_timeStep),gl.uniform1i(this.u_solver,this.solverType),this.emit.bindUniforms(),i=0;i<this.forceList.length;i++)this.forceList[i].bindUniforms();for(i=0;i<this.limitList.length;i++)this.limitList[i].bindUniforms();gl.beginTransformFeedback(gl.POINTS)}else gl.bufferSubData(gl.ARRAY_BUFFER,0,this.s2);!0===this.blend?(gl.enable(gl.BLEND),gl.blendFuncSeparate(gl.ONE_MINUS_SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA,gl.ONE,gl.ONE),gl.blendEquation(gl.FUNC_ADD)):!0===this.blend2&&(gl.enable(gl.BLEND),gl.blendFuncSeparate(gl.DST_ALPHA,gl.SRC_ALPHA,gl.ONE,gl.ONE),gl.blendEquation(gl.FUNC_ADD)),gl.drawArrays(gl.POINTS,0,this.partCount),!0!==this.blend&&!0!==this.blend2||gl.disable(gl.BLEND),this.sysType!=SYS_CPU?(gl.endTransformFeedback(),this.sysType==SYS_GPU&&1<g_runMode?gl.copyBufferSubData(gl.TRANSFORM_FEEDBACK_BUFFER,gl.ARRAY_BUFFER,0,0,4*this.sInd):this.sysType==SYS_HYBRID&&1<g_runMode&&(gl.getBufferSubData(gl.TRANSFORM_FEEDBACK_BUFFER,0,this.s1),this.hybApply=!0),gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER,0,null)):this.swap(),gl.bindVertexArray(null),this.isNudge&&(this.isNudge=!1)},PartSys.prototype.eulerSolver=function(t,e,s,o){for(i=0;i<this.sInd;i+=CPU_PART_MAXVAR)this.aging&&(s[i+CPU_PART_AGE]+=e[i+CPU_PART_AGE]*o,s[i+CPU_PART_AGE]>s[i+CPU_PART_LIFE])?this.makeParticle(s,i):(s[i+CPU_PART_XPOS]+=e[i+CPU_PART_XPOS]*o,s[i+CPU_PART_YPOS]+=e[i+CPU_PART_YPOS]*o,s[i+CPU_PART_ZPOS]+=e[i+CPU_PART_ZPOS]*o,s[i+CPU_PART_XVEL]+=e[i+CPU_PART_XVEL]*o,s[i+CPU_PART_YVEL]+=e[i+CPU_PART_YVEL]*o,s[i+CPU_PART_ZVEL]+=e[i+CPU_PART_ZVEL]*o,s[i+CPU_PART_XACC]=e[i+CPU_PART_XVEL],s[i+CPU_PART_YACC]=e[i+CPU_PART_YVEL],s[i+CPU_PART_ZACC]=e[i+CPU_PART_ZVEL])},PartSys.prototype.midpointSolver=function(t,i,e,s){this.sM.set(t),this.eulerSolver(t,i,this.sM,.5*s),this.dotFinder(this.sM,this.sMdot),this.eulerSolver(t,this.sMdot,e,s)},PartSys.prototype.velVerletSolver=function(t,e,s,o){var r=.5*o,_=r*o;for(i=0;i<this.sInd;i+=CPU_PART_MAXVAR)this.aging&&(s[i+CPU_PART_AGE]+=e[i+CPU_PART_AGE]*o,s[i+CPU_PART_AGE]>s[i+CPU_PART_LIFE])?this.makeParticle(s,i):(s[i+CPU_PART_XPOS]=t[i+CPU_PART_XPOS]+t[i+CPU_PART_XVEL]*o+t[CPU_PART_XACC]*_,s[i+CPU_PART_YPOS]=t[i+CPU_PART_YPOS]+t[i+CPU_PART_YVEL]*o+t[CPU_PART_YACC]*_,s[i+CPU_PART_ZPOS]=t[i+CPU_PART_ZPOS]+t[i+CPU_PART_ZVEL]*o+t[CPU_PART_ZACC]*_);for(this.applyAllForces(s,this.forceList),i=0;i<this.sInd;i+=CPU_PART_MAXVAR)s[i+CPU_PART_XACC]=s[i+CPU_PART_X_FTOT]/s[i+CPU_PART_MASS],s[i+CPU_PART_YACC]=s[i+CPU_PART_Y_FTOT]/s[i+CPU_PART_MASS],s[i+CPU_PART_ZACC]=s[i+CPU_PART_Z_FTOT]/s[i+CPU_PART_MASS],s[i+CPU_PART_XVEL]=t[i+CPU_PART_XVEL]+(s[i+CPU_PART_XACC]+t[i+CPU_PART_XACC])*r,s[i+CPU_PART_YVEL]=t[i+CPU_PART_YVEL]+(s[i+CPU_PART_YACC]+t[i+CPU_PART_YACC])*r,s[i+CPU_PART_ZVEL]=t[i+CPU_PART_ZVEL]+(s[i+CPU_PART_ZACC]+t[i+CPU_PART_ZACC])*r},PartSys.prototype.backEulerSolver=function(t,i,e,s){for(this.eulerSolver(t,i,e,s),this.applyAllForces(e,this.forceList),this.dotFinder(e,i),k=0;k<this.sInd;k+=CPU_PART_MAXVAR)e[k+CPU_PART_AGE]<t[k+CPU_PART_AGE]||(e[k+CPU_PART_XPOS]=t[k+CPU_PART_XPOS]+i[k+CPU_PART_XPOS]*s,e[k+CPU_PART_YPOS]=t[k+CPU_PART_YPOS]+i[k+CPU_PART_YPOS]*s,e[k+CPU_PART_ZPOS]=t[k+CPU_PART_ZPOS]+i[k+CPU_PART_ZPOS]*s,e[k+CPU_PART_XVEL]=t[k+CPU_PART_XVEL]+i[k+CPU_PART_XVEL]*s,e[k+CPU_PART_YVEL]=t[k+CPU_PART_YVEL]+i[k+CPU_PART_YVEL]*s,e[k+CPU_PART_ZVEL]=t[k+CPU_PART_ZVEL]+i[k+CPU_PART_ZVEL]*s,e[k+CPU_PART_XACC]=i[k+CPU_PART_XVEL],e[k+CPU_PART_YACC]=i[k+CPU_PART_YVEL],e[k+CPU_PART_ZACC]=i[k+CPU_PART_ZVEL])},PartSys.prototype.backMidpointSolver=function(t,e,s,o){for(this.midpointSolver(t,e,s,o),this.dotFinder(s,this.sMdot),i=0;i<this.sInd;i+=CPU_PART_MAXVAR)s[i+CPU_PART_AGE]<t[i+CPU_PART_AGE]||(this.sM[i+CPU_PART_XPOS]=s[i+CPU_PART_XPOS]-o/2*this.sMdot[i+CPU_PART_XPOS],this.sM[i+CPU_PART_YPOS]=s[i+CPU_PART_YPOS]-o/2*this.sMdot[i+CPU_PART_YPOS],this.sM[i+CPU_PART_ZPOS]=s[i+CPU_PART_ZPOS]-o/2*this.sMdot[i+CPU_PART_ZPOS],this.sM[i+CPU_PART_XVEL]=s[i+CPU_PART_XVEL]-o/2*this.sMdot[i+CPU_PART_XVEL],this.sM[i+CPU_PART_YVEL]=s[i+CPU_PART_YVEL]-o/2*this.sMdot[i+CPU_PART_YVEL],this.sM[i+CPU_PART_ZVEL]=s[i+CPU_PART_ZVEL]-o/2*this.sMdot[i+CPU_PART_ZVEL]);for(this.dotFinder(this.sM,this.sMdot),i=0;i<this.sInd;i+=CPU_PART_MAXVAR)s[i+CPU_PART_AGE]<t[i+CPU_PART_AGE]||(this.sM[i+CPU_PART_XPOS]=s[i+CPU_PART_XPOS]-o*this.sMdot[i+CPU_PART_XPOS],this.sM[i+CPU_PART_YPOS]=s[i+CPU_PART_YPOS]-o*this.sMdot[i+CPU_PART_YPOS],this.sM[i+CPU_PART_ZPOS]=s[i+CPU_PART_ZPOS]-o*this.sMdot[i+CPU_PART_ZPOS],this.sM[i+CPU_PART_XVEL]=s[i+CPU_PART_XVEL]-o*this.sMdot[i+CPU_PART_XVEL],this.sM[i+CPU_PART_YVEL]=s[i+CPU_PART_YVEL]-o*this.sMdot[i+CPU_PART_YVEL],this.sM[i+CPU_PART_ZVEL]=s[i+CPU_PART_ZVEL]-o*this.sMdot[i+CPU_PART_ZVEL]);for(i=0;i<this.sInd;i+=CPU_PART_MAXVAR)s[i+CPU_PART_AGE]<t[i+CPU_PART_AGE]||(this.sMdot[i+CPU_PART_XPOS]=this.sM[i+CPU_PART_XPOS]-t[i+CPU_PART_XPOS],this.sMdot[i+CPU_PART_YPOS]=this.sM[i+CPU_PART_YPOS]-t[i+CPU_PART_YPOS],this.sMdot[i+CPU_PART_ZPOS]=this.sM[i+CPU_PART_ZPOS]-t[i+CPU_PART_ZPOS],this.sMdot[i+CPU_PART_XVEL]=this.sM[i+CPU_PART_XVEL]-t[i+CPU_PART_XVEL],this.sMdot[i+CPU_PART_YVEL]=this.sM[i+CPU_PART_YVEL]-t[i+CPU_PART_YVEL],this.sMdot[i+CPU_PART_ZVEL]=this.sM[i+CPU_PART_ZVEL]-t[i+CPU_PART_ZVEL]);for(i=0;i<this.sInd;i+=CPU_PART_MAXVAR)s[i+CPU_PART_AGE]<t[i+CPU_PART_AGE]||(s[i+CPU_PART_XPOS]=s[i+CPU_PART_XPOS]-this.sMdot[i+CPU_PART_XPOS]/2,s[i+CPU_PART_YPOS]=s[i+CPU_PART_YPOS]-this.sMdot[i+CPU_PART_YPOS]/2,s[i+CPU_PART_ZPOS]=s[i+CPU_PART_ZPOS]-this.sMdot[i+CPU_PART_ZPOS]/2,s[i+CPU_PART_XVEL]=s[i+CPU_PART_XVEL]-this.sMdot[i+CPU_PART_XVEL]/2,s[i+CPU_PART_YVEL]=s[i+CPU_PART_YVEL]-this.sMdot[i+CPU_PART_YVEL]/2,s[i+CPU_PART_ZVEL]=s[i+CPU_PART_ZVEL]-this.sMdot[i+CPU_PART_ZVEL]/2)},PartSys.prototype.symplecticEulerSolver=function(t,e,s,o){for(this.eulerSolver(t,e,s,o),i=0;i<this.sInd;i+=CPU_PART_MAXVAR)s[i+CPU_PART_AGE]<t[i+CPU_PART_AGE]||(s[i+CPU_PART_XPOS]=t[i+CPU_PART_XPOS]+s[i+CPU_PART_XVEL]*o,s[i+CPU_PART_YPOS]=t[i+CPU_PART_YPOS]+s[i+CPU_PART_YVEL]*o,s[i+CPU_PART_ZPOS]=t[i+CPU_PART_ZPOS]+s[i+CPU_PART_ZVEL]*o)},PartSys.prototype.getVShader=function(){var t=this.getHeader();return t+=this.getUniforms(),t+=this.getAttributes(),t+=this.getVariables(),t+=this.getVaryings(),t+=this.getHelpers(),this.sysType!=SYS_CPU&&(t+=this.getEmitter(),t+=this.getVertexCode()),t+=this.getMain()},PartSys.prototype.getHeader=function(){return`#version 300 es
		precision mediump float;	
	`},PartSys.prototype.getEmitter=function(){return this.emit.getMakeParticle()},PartSys.prototype.getEmitterCall=function(){return this.emit.getEmitterCall()},PartSys.prototype.getHelpers=function(){var t=`
		const float PI = 3.1415926535897932384626433832795;
		`;return t+=this.getRand(),t+=this.getRandVec()},PartSys.prototype.getRand=function(){return`
		/**
		 * Generates a pseudorandom number between 0 and 1
		 * http://www.science-and-fiction.org/rendering/noise.html
		 * https://stackoverflow.com/questions/4200224/random-noise-functions-for-glsl/4275343#4275343
		 * https://stackoverflow.com/questions/12964279/whats-the-origin-of-this-glsl-rand-one-liner
		 *
		 * @param {vec2} co used as a seed for the noise.
		 * @return {float} random number between 0 and 1
		 */
		float rand(vec2 co){
   			return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453);
		}
	`},PartSys.prototype.getRandVec=function(){return`
		/**
		 * Returns a random vec3 of magnitude scale
		 * Based on gl-matrix
		 */
		vec3 randVec(float scale) {
			float r = rand(a_Position.xz) * 2.0 * PI;
			float z = rand(a_Position.yz) * 2.0 - 1.0;
			float zScale = sqrt(1.0 - z * z) * scale;
			return vec3(cos(r) * zScale, sin(r) * zScale, z * scale);
		}
	`},PartSys.prototype.getUniforms=function(){var t=`
		uniform mat4  u_MvpMatrix;
		uniform int   u_runMode;
	`;if(this.sysTyoe!=SYS_CPU){for(t+=`
		uniform bool  u_isAging;
		uniform bool  u_isNudge;
		uniform float u_timeStep;
		uniform int   u_solver;
		`,t+=this.emit.getUniforms(),void 0!==this.forceList[0]&&(t+=this.forceList[0].getStructs()),void 0!==this.limitList[0]&&(t+=this.limitList[0].getStructs()),i=0;i<this.fCount.length;i++)if(1<=this.fCount[i]){var e=0;for(j=0;j<this.forceList.length;j++)this.forceList[j].forceType==i&&(this.forceList[j].id=e+1,e++)}for(i=0;i<this.lCount.length;i++)if(1<=this.lCount[i]){e=0;for(j=0;j<this.limitList.length;j++)this.limitList[j].limitType==i&&(this.limitList[j].id=e+1,e++)}for(i=0;i<this.forceList.length;i++)t+=this.forceList[i].getUniforms(this.fCount[this.forceList[i].forceType]);for(i=0;i<this.limitList.length;i++)t+=this.limitList[i].getUniforms(this.lCount[this.limitList[i].limitType])}return t},PartSys.prototype.getAttributes=function(){var t=`
		in vec3	  a_Position;
		in vec3   a_HSI;
		in float  a_Mass;
		`;return this.sysType!=SYS_CPU&&(t+=`
		in vec3   a_Velocity;
		in vec3	  a_Acc;
		in float  a_Age;
		in float  a_Life;
		`,this.sysType===SYS_HYBRID&&(t+=`
		in vec3   a_Ftot;
			`)),t},PartSys.prototype.getVariables=function(){var t="";return this.sysType!=SYS_CPU?(t+=`
			vec3 dotPos;			//velocity
			vec3 dotVel;			//acceleration
		
			vec3 dotMPos;			//midpoint velocity
			vec3 dotMVel;			//midpoint acceleration
		
			vec3 MPos;				//midpoint position
			vec3 MVel;				//midpoint velocity
		`,this.sysType==SYS_GPU&&(t+=`	vec3 v_Ftot = vec3(0.0, 0.0, 0.0);	// Treated like varying for compatability
			`)):t+=`	vec3 v_HSI;	// Treated like varying for compatability
		`,t},PartSys.prototype.getVaryings=function(){var t=`
		out vec4  v_Color;
	`;return this.sysType!=SYS_CPU&&(t+=`
		out float v_Age;
		out float v_Life;
		out vec3  v_Position;
		out vec3  v_Velocity;
		out vec3  v_Acc;
		out float v_Mass;
		out vec3  v_HSI;
		`,this.sysType==SYS_HYBRID&&(t+=`
				out vec3 v_Ftot;
			`)),t},PartSys.prototype.getVertexCode=function(){var t="";for(i=0;i<this.forceList.length;i++){var e=this.forceList[i].forceType;this.fCount[e]==this.forceList[i].id&&(t+=this.forceList[i].getCalc())}for(i=0;i<this.limitList.length;i++){e=this.limitList[i].limitType;this.lCount[e]==this.limitList[i].id&&(t+=this.limitList[i].getCalc())}return t+=this.getApplyForces(),t+=this.getDotFinder(),t+=this.getSolver(),t+=this.getConstraint()},PartSys.prototype.getApplyForces=function(){var t=`
		/**
		 * Accumulates forces in Ftot
		 */
		void applyAllForces(int mode) {
			`;for(i=0;i<this.forceList.length;i++)t+=this.forceList[i].getCall();return t+=`
		}
		`},PartSys.prototype.getDotFinder=function(){return`
		/**
		 * Finds the derivative of all of the attributes
		 *
		 * @param {int} mode determines which mode to be in
		 */
		void dotFinder(int mode) {
			if (mode == 0) {	//standard
				dotPos = a_Velocity;
				dotVel = v_Ftot / a_Mass;
			} else if (mode == 1) { //midpoint special call
				dotMPos = MVel;
				dotMVel = v_Ftot / a_Mass;
			} else if (mode == 2) { //back midpt special
				dotMPos = v_Velocity;
			}
		}
		`},PartSys.prototype.getSolver=function(){return`
		/**
		 * Euler Solver
		 *
		 * @param {int} mode that determines why it is being called
		 * @param {float} step size of timeStep
		 */ 
		void eulerSolver(int mode, float step) {
			if (mode == 0) { //standard Euler Solver
				v_Position = a_Position + (dotPos * step);
				v_Velocity = a_Velocity + (dotVel * step);
				v_Acc = v_Ftot / a_Mass;
			} else if (mode == 1) { //midpoint first call
				MPos = a_Position + (dotPos * step);
				MVel = a_Velocity + (dotVel * step);
			} else if (mode == 2) { //midpoint second call
				v_Position = a_Position + (dotMPos * step);
				v_Velocity = a_Velocity + (dotMVel * step);
				v_Acc = v_Ftot / a_Mass;
			}
		}
		
		/**
		 * Midpoint Solver
		 *
		 * @param {float} step size of timeStep
		 */ 
		void midpointSolver(float step) {
			eulerSolver(1, step * 0.5);
			dotFinder(1);
			eulerSolver(2, step);
		}
		
		/**
		 * Velocity Verlet Solver
		 *
		 * @param {float} step size of timeStep
		 */ 
		void velVerletSolver(float step) {		
			v_Position = a_Position + a_Velocity * step + a_Acc * (step * step * 0.5);
			v_Ftot = vec3(0.0, 0.0, 0.0);
			applyAllForces(1);
			v_Acc = v_Ftot / a_Mass;
			v_Velocity = a_Velocity + (v_Acc + a_Acc) * (step * 0.5);
		}
	
		/**
		 * Back Euler Solver
		 *
		 * @param {float} step size of timeStep
		 */
		void backEulerSolver(float step) {
			eulerSolver(1, step);
			v_Ftot = vec3(0.0, 0.0, 0.0);
			applyAllForces(1);
			dotFinder(1);
			eulerSolver(2, step);
		}
		
		/**
		 * Symplectic Euler Solver
		 *
		 * @param {float} step size of timeStep
		 */
		void backMidpointSolver(float step) {
			midpointSolver(step);
			dotFinder(2);
			MPos = v_Position - (step / 2.0) * dotMPos;
			MVel = v_Velocity - (step / 2.0) * dotMVel;
			dotFinder(1);
			MPos = v_Position - dotMPos * step;
			MVel = v_Velocity - dotMVel * step;
			dotMPos = MPos - a_Position;
			dotMVel = MVel - a_Velocity;
			v_Position -= dotMPos / 2.0;
			v_Velocity -= dotMVel / 2.0;
		}
		
		/**
		 * Symplectic Euler Solver
		 *
		 * @param {float} step size of timeStep
		 */
		void symplecticEulerSolver(float step) {
			eulerSolver(0, step);
			v_Position = a_Position + v_Velocity * step;
		}
	
		/**
		 * Uses the derivatives to generate the next state
		 */
		void solver() {
			if (u_isAging)
				v_Age = a_Age + u_timeStep;
			else
				v_Age = a_Age;
			
			switch (u_solver) {
				default:
				case 0: //SOLV_EULER
					eulerSolver(0, u_timeStep);
					break;
				case 1: //SOLV_MIDPOINT
					midpointSolver(u_timeStep);
					break;
				case 2: //VEL_VERLET
					velVerletSolver(u_timeStep);
					break;
				case 3: //BACK_EULER
					backEulerSolver(u_timeStep);
					break;
				case 4: //BACK_MIDPT
					backMidpointSolver(u_timeStep);
					break;
				case 5:
					symplecticEulerSolver(u_timeStep);
					break;
			}
			
			v_Mass = a_Mass;
		}
		`},PartSys.prototype.getConstraint=function(){var t=`
		/**
		 * Checks to see if any particles have been effected by the constraints
		 */
		void doConstraint() {
		`;for(i=0;i<this.limitList.length;i++)t+=this.limitList[i].getCall();return t+=`
		}
		`},PartSys.prototype.getMain=function(){var t=`
		void main() {`;if(this.sysType!=SYS_CPU){if(this.sysType==SYS_HYBRID&&(t+=`
			v_Ftot = a_Ftot;
			`),t+=`
			if (u_runMode > 1) {
				v_HSI = a_HSI;
				v_Life = a_Life;
				if (a_Age < a_Life) {
					applyAllForces(0);
					dotFinder(0);
					solver();
					doConstraint();
				} else {`,t+=this.getEmitterCall(),0<this.lCount[LIM_COLOR_AGE])for(i=0;i<this.limitList.length;i++)this.limitList[i].limitType==LIM_COLOR_AGE&&(t+=this.limitList[i].getCall());t+=`			
				}
			} else {
				v_Age = a_Age;
				v_Life = a_Life;
				v_Position = a_Position.xyz;
				v_Velocity = a_Velocity;
				v_Acc = a_Acc;
				v_Mass = a_Mass;
				v_HSI = a_HSI;
			}
			
			if (u_isNudge) {				//adds random velocity to all particles
				v_Velocity += randVec(4.0);
			}
		`}return this.sysType==SYS_HYBRID&&(t+="v_Ftot = vec3(0.0, 0.0, 0.0);"),this.sysType===SYS_CPU?t+=`
			gl_PointSize = a_Mass * 4.0;
			gl_Position = u_MvpMatrix * vec4(a_Position, 1.0);
			v_HSI = a_HSI;
		`:t+=`
			gl_PointSize = v_Mass * 4.0;
			gl_Position = u_MvpMatrix * vec4(v_Position, 1.0);
		`,t+=`
			if (u_runMode == 0) {
				v_Color = vec4(0.0, rand(vec2(gl_VertexID, gl_VertexID)) + 0.5, 1.0, 1.0);		//red: 0 == reset
			}
			else if (u_runMode <= 2) {
				v_Color = vec4(20.0, rand(vec2(gl_VertexID, gl_VertexID)) + 0.5, 1.0, 1.0);		//yellow: <= 2
			}
			else {
				v_Color = vec4(v_HSI, 1.0);
			}
		}
	`},PartSys.prototype.getFShader=function(){var t=this.getHeader();return t+=this.getFIO(),t+=this.getFHelpers(),t+=this.getFMain()},PartSys.prototype.getFIO=function(){return"\n\t\tin vec4 v_Color;\n\t\n\t\tout vec4 myOutputColor;\n\t"},PartSys.prototype.getFHelpers=function(){return this.getHSItoRGB()},PartSys.prototype.getHSItoRGB=function(){return`
		/**
		 * Converts Hue, Saturation, Intensity to RGB
		 *
		 * @param {vec3} HSI H degrees, S[0, 1], I[0, 1]
		 */
		vec3 HSItoRGB(vec3 HSI) {
			float hPrime = mod(HSI.x, 360.0);
			if (hPrime < 0.0)
				hPrime += 360.0;
			hPrime /= 60.0;
			float Z = 1.0 - abs(mod(hPrime, 2.0) - 1.0);
			float C = (3.0 * HSI.y * HSI.z) / (1.0 + Z);
			float X = C * Z;
			float m = HSI.z * (1.0 - HSI.y);
			
			vec3 RGB;
			if (hPrime <= 3.0) {
				if (hPrime <= 1.0) {
					RGB.r = C;
					RGB.g = X;
				} else {
					RGB.r = X;
					RGB.g = C;
				}
				RGB.b = 0.0;
			} else if (hPrime <= 5.0) {
				if (hPrime <= 4.0) {
					RGB.r = 0.0;
					RGB.g = X;
				} else {
					RGB.r = X;
					RGB.g = 0.0;
				}
				RGB.b = C;
			} else {
				RGB.r = C;
				RGB.g = 0.0;
				RGB.b = X;
			}
			
			RGB.rgb += m;
			RGB.rgb = min(RGB.xyz, 1.0);
			return RGB;
		}
	`},PartSys.prototype.getFMain=function(){var t=`
		void main() {
	`;return t+=`
			float dist = distance(gl_PointCoord, vec2(0.5));
			if (dist < 0.5) {`,!0===this.orb?t+=`
				myOutputColor = vec4((1.0-2.0*dist) * HSItoRGB(v_Color.rgb), 1.0);
		`:!0===this.blend?t+=`
				myOutputColor = vec4(HSItoRGB(v_Color.rgb), 0.25);`:!0===this.blend2?t+=`
				myOutputColor = vec4(HSItoRGB(v_Color.rgb), 0.6);`:t+=`
				myOutputColor = vec4(HSItoRGB(v_Color.rgb), 1.0);`,t+=`
			} else {discard;}
	`,t+=`
		}
	`};