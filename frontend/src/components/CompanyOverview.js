import { motion } from 'framer-motion'
import { Tooltip } from 'react-tooltip'

const CompanyOverview = ({ company }) => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 1 }}
	>
		<h3 className='text-lg font-semibold mb-2'>Основные данные</h3>
		<p>
			<strong data-tooltip='ИНН — это идентификационный номер налогоплательщика'>
				ИНН:
			</strong>{' '}
			{company.inn}
		</p>
		<p>
			<strong data-tooltip='ОГРН — это основной государственный регистрационный номер'>
				ОГРН:
			</strong>{' '}
			{company.ogrn}
		</p>
		<p>
			<strong data-tooltip='Дата регистрации компании'>
				Дата регистрации:
			</strong>{' '}
			{company.registration_date}
		</p>
		<p>
			<strong>Статус:</strong>{' '}
			<span
				className={`px-2 py-1 rounded text-white ${
					company.status === 'Активна' ? 'bg-green-500' : 'bg-red-500'
				}`}
			>
				{company.status}
			</span>
		</p>
		<Tooltip />
	</motion.div>
)

export default CompanyOverview
