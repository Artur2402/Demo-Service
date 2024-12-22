import { motion } from 'framer-motion'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const MapSection = ({ company }) => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 1, delay: 0.9 }}
	>
		<h3 className='text-lg font-semibold mb-2'>Местоположение</h3>
		<div className='h-64 rounded overflow-hidden'>
			<MapContainer
				center={[company.latitude, company.longitude]}
				zoom={13}
				className='h-full w-full'
			>
				<TileLayer
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					attribution='&copy; OpenStreetMap contributors'
				/>
				<Marker position={[company.latitude, company.longitude]}>
					<Popup>{company.name}</Popup>
				</Marker>
			</MapContainer>
		</div>
	</motion.div>
)

export default MapSection
