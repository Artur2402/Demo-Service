import axios from 'axios'
import debounce from 'lodash.debounce'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CompanyTable from './CompanyTable'
import Filters from './Filters'

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

	const fetchCompanies = useCallback(async () => {
		try {
			setLoading(true)
			const response = await axios.get('http://127.0.0.1:8000/api/companies/')
			setCompanies(response.data)
			setFilteredCompanies(response.data)
			setLoading(false)
		} catch (error) {
			console.error('Ошибка при загрузке данных:', error)
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchCompanies()
	}, [fetchCompanies])

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
			<Filters
				filters={filters}
				handleInputChange={handleInputChange}
				handleResetFilters={handleResetFilters}
			/>
			<CompanyTable
				companies={filteredCompanies}
				handleRowClick={handleRowClick}
			/>
		</div>
	)
}

export default CompaniesList
