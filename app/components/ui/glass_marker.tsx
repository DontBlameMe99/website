export function GlassMarker({ visible }: { visible: boolean }) {
	return visible ? <span aria-hidden="true" className="glass-marker" /> : null;
}
