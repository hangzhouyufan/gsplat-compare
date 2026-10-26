// Deterministic synthetic Gaussian splats; no external sample data or uploads.
export function demoFile(side) {
 const n=5000, data=new ArrayBuffer(n*32),v=new DataView(data);for(let i=0;i<n;i++){
 const t=i*2.399963229728653,y=1-2*(i+.5)/n,r=Math.sqrt(1-y*y),x=Math.cos(t)*r,z=Math.sin(t)*r;const o=i*32;
 v.setFloat32(o,x,true);v.setFloat32(o+4,y,true);v.setFloat32(o+8,z,true);for(let k=0;k<3;k++)v.setFloat32(o+12+k*4,.023+(side&&y>.25?.016:0),true);
 v.setUint8(o+24,Math.round((x+1)*100)+40);v.setUint8(o+25,Math.round((y+1)*90)+50);v.setUint8(o+26,side?150:210);v.setUint8(o+27,235);v.setUint8(o+28,255);for(let k=1;k<4;k++)v.setUint8(o+28+k,128);
 }return new File([data],side?'示例-B.splat':'示例-A.splat');
}
