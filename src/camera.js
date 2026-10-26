import * as THREE from 'three';
export function verticalFov(aspect, horizontal = 85) {
  return THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(horizontal) / 2) / aspect));
}
export function captureMapping(a, b) {
  const rotation = b.camera.quaternion.clone().multiply(a.camera.quaternion.clone().invert());
  const scale = b.camera.position.distanceTo(b.controls.target) / Math.max(a.camera.position.distanceTo(a.controls.target), 1e-9);
  const offset = b.camera.position.clone().sub(a.camera.position.clone().applyQuaternion(rotation).multiplyScalar(scale));
  return { rotation, scale, offset };
}
export function inverseMapping(m) {
  const rotation = m.rotation.clone().invert(), scale = 1 / m.scale;
  return { rotation, scale, offset: m.offset.clone().negate().applyQuaternion(rotation).multiplyScalar(scale) };
}
export function applyMapping(source, dest, m) {
  dest.camera.position.copy(source.camera.position).applyQuaternion(m.rotation).multiplyScalar(m.scale).add(m.offset);
  dest.camera.quaternion.copy(m.rotation).multiply(source.camera.quaternion);
  dest.camera.up.copy(source.camera.up).applyQuaternion(m.rotation);
  // Map the forward focus, rather than an arbitrary orbit target, so binding never snaps.
  const distance = source.camera.position.distanceTo(source.controls.target) * m.scale;
  dest.controls.target.copy(new THREE.Vector3(0,0,-1).applyQuaternion(dest.camera.quaternion).multiplyScalar(distance).add(dest.camera.position));
  dest.camera.updateMatrixWorld();
}
