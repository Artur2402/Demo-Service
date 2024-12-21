import axios from 'axios'
import debounce from 'lodash.debounce' // Убедитесь, что библиотека установлена
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AiOutlineReload, AiOutlineSearch } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import '../styles/CompaniesList.css'

const CompaniesList = () => {
	const [companies, setCompanies] = useState([])
	const [filteredCompanies, setFilteredCompanies] = useState([])
	const [loading, setLoading] = useState(true)
	const [filters, setFilters] = useState({
		name: '',
		inn: '',
		ogrn: '',
		status: '',
	})

	const navigate = useNavigate()

	const handleRowClick = id => {
		navigate(`/company/${id}`)
	}

	// Функция для получения компаний с сервера
	const fetchCompanies = useCallback(async () => {
		try {
			setLoading(true)
			const response = await axios.get('http://127.0.0.1:8000/api/companies/')
			setCompanies(response.data)
			setFilteredCompanies(response.data) // По умолчанию показываем все
			setLoading(false)
		} catch (error) {
			console.error('Ошибка при загрузке данных:', error)
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchCompanies()
	}, [fetchCompanies])

	// Локальная фильтрация по всем полям
	const applyFilters = useCallback(() => {
		const lowerCaseFilters = Object.keys(filters).reduce((acc, key) => {
			acc[key] = filters[key].toLowerCase()
			return acc
		}, {})

		const filtered = companies.filter(company =>
			Object.entries(lowerCaseFilters).every(([key, value]) =>
				company[key]?.toLowerCase().includes(value)
			)
		)

		setFilteredCompanies(filtered)
	}, [filters, companies])

	// Дебаунс для фильтрации
	const debouncedApplyFilters = useMemo(
		() => debounce(applyFilters, 500),
		[applyFilters]
	)

	useEffect(() => {
		debouncedApplyFilters()
		return () => debouncedApplyFilters.cancel()
	}, [filters, debouncedApplyFilters])

	const handleInputChange = event => {
		const { name, value } = event.target
		setFilters(prevFilters => ({
			...prevFilters,
			[name]: value,
		}))
	}

	const handleResetFilters = () => {
		setFilters({
			name: '',
			inn: '',
			ogrn: '',
			status: '',
		})
		setFilteredCompanies(companies)
	}

	if (loading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<div className='animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500'></div>
			</div>
		)
	}

	return (
		<div className='p-4'>
			<h1 className='text-2xl font-bold mb-4 text-center'>Список компаний</h1>
			<div className='bg-white shadow-md rounded-md p-4 mb-6'>
				<form onSubmit={e => e.preventDefault()}>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						{['name', 'inn', 'ogrn', 'status'].map(field => (
							<div key={field} className='relative'>
								<input
									type='text'
									placeholder={
										field === 'name'
											? 'Название компании'
											: field === 'inn'
											? 'ИНН'
											: field === 'ogrn'
											? 'ОГРН'
											: 'Статус'
									}
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
			<table className='table-auto w-full bg-white shadow-md rounded-md'>
				<thead>
					<tr className='bg-gray-100'>
						<th className='px-4 py-2'>ИНН</th>
						<th className='px-4 py-2'>ОГРН</th>
						<th className='px-4 py-2'>Название</th>
						<th className='px-4 py-2'>Адрес</th>
						<th className='px-4 py-2'>Руководитель</th>
						<th className='px-4 py-2'>Вид деятельности</th>
						<th className='px-4 py-2'>Дата регистрации</th>
						<th className='px-4 py-2'>Статус</th>
					</tr>
				</thead>
				<tbody>
					{filteredCompanies.length === 0 ? (
						<tr>
							<td colSpan='8' className='text-center p-4 text-gray-500'>
								Данные не найдены. Попробуйте изменить фильтры.
							</td>
						</tr>
					) : (
						filteredCompanies.map(company => (
							<tr
								key={company.id}
								onClick={() => handleRowClick(company.id)}
								className='cursor-pointer hover:bg-blue-100 transition duration-300'
							>
								<td className='border px-4 py-2'>{company.inn}</td>
								<td className='border px-4 py-2'>{company.ogrn}</td>
								<td className='border px-4 py-2'>{company.name}</td>
								<td className='border px-4 py-2'>{company.address}</td>
								<td className='border px-4 py-2'>{company.director}</td>
								<td className='border px-4 py-2'>{company.activity}</td>
								<td className='border px-4 py-2'>
									{company.registration_date}
								</td>
								<td className='border px-4 py-2'>{company.status}</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	)
}

export default CompaniesList
