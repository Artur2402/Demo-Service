import { motion } from 'framer-motion'

const DirectorInfo = ({ company }) => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 1, delay: 0.6 }}
	>
		<h3 className='text-lg font-semibold mb-2'>Руководство</h3>
		<p>
			<strong>Директор:</strong> {company.director}
		</p>
	</motion.div>
)

export default DirectorInfo
