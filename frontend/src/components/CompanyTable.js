import classNames from 'classnames'
import React from 'react'
import '../styles/CompanyTable.css'

const CompanyTable = ({ companies, handleRowClick }) => (
	<table className='table-auto w-full bg-white shadow-md rounded-md'>
		<thead>
			<tr className='bg-gray-100'>
				{[
					'ИНН',
					'ОГРН',
					'Название',
					'Адрес',
					'Руководитель',
					'Вид деятельности',
					'Дата регистрации',
					'Статус',
				].map(header => (
					<th key={header} className='px-4 py-2 text-left'>
						{header}
					</th>
				))}
			</tr>
		</thead>
		<tbody>
			{companies.length === 0 ? (
				<tr>
					<td colSpan='8' className='text-center p-4 text-gray-500'>
						Данные не найдены. Попробуйте изменить фильтры.
					</td>
				</tr>
			) : (
				companies.map(company => (
					<tr
						key={company.id}
						onClick={() => handleRowClick(company.id)}
						className={classNames(
							'cursor-pointer hover:bg-blue-100 transition duration-300'
						)}
					>
						<td className='border px-4 py-2'>{company.inn}</td>
						<td className='border px-4 py-2'>{company.ogrn}</td>
						<td className='border px-4 py-2'>{company.name}</td>
						<td className='border px-4 py-2'>{company.address}</td>
						<td className='border px-4 py-2'>{company.director}</td>
						<td className='border px-4 py-2'>{company.activity}</td>
						<td className='border px-4 py-2'>{company.registration_date}</td>
						<td className='border px-4 py-2'>{company.status}</td>
					</tr>
				))
			)}
		</tbody>
	</table>
)

export default CompanyTable
