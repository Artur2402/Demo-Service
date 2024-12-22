import { motion } from 'framer-motion'
import { Tooltip } from 'react-tooltip'

const ContactInfo = ({ company }) => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 1, delay: 0.3 }}
	>
		<h3 className='text-lg font-semibold mb-2'>Контакты</h3>
		<p>
			<strong data-tooltip='Адрес компании, где она зарегистрирована'>
				Адрес:
			</strong>{' '}
			{company.address}
		</p>
		<p>
			<strong data-tooltip='Телефонный номер компании'>Телефон:</strong>{' '}
			{company.phone || 'Не указан'}
		</p>
		<p>
			<strong data-tooltip='Адрес электронной почты компании'>Email:</strong>{' '}
			{company.email || 'Не указан'}
		</p>
		<Tooltip />
	</motion.div>
)

export default ContactInfo
