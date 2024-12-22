import React, { useMemo } from 'react'
import { AiOutlineReload, AiOutlineSearch } from 'react-icons/ai'

// Функция для получения плейсхолдера
const getPlaceholder = field => {
	switch (field) {
		case 'name':
			return 'Название компании'
		case 'inn':
			return 'ИНН'
		case 'ogrn':
			return 'ОГРН'
		case 'status':
			return 'Статус'
		default:
			return ''
	}
}

const Filters = ({ filters, handleInputChange, handleResetFilters }) => {
	const placeholders = useMemo(() => {
		return Object.keys(filters).reduce((acc, field) => {
			acc[field] = getPlaceholder(field)
			return acc
		}, {})
	}, [filters])

	return (
		<div className='bg-white shadow-md rounded-md p-4 mb-6'>
			<form onSubmit={e => e.preventDefault()}>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
					{Object.keys(filters).map(field => (
						<div key={field} className='relative'>
							<input
								type='text'
								placeholder={placeholders[field]}
								name={field}
								value={filters[field]}
								onChange={handleInputChange}
								className='border p-2 rounded w-full'
							/>
							<AiOutlineSearch className='absolute top-2 right-2 text-gray-400' />
						</div>
					))}
				</div>
				<div className='mt-4 text-center'>
					<button
						onClick={handleResetFilters}
						type='button'
						className='flex items-center justify-center bg-red-500 text-white px-3 py-2 rounded shadow hover:bg-red-600'
					>
						<AiOutlineReload className='mr-2' />
						Сбросить
					</button>
				</div>
			</form>
		</div>
	)
}

export default Filters
