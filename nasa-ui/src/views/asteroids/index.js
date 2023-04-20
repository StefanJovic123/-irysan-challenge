import React, { useEffect, useState } from 'react'
import { AdaptableCard, DataTable } from 'components/shared'
import { DatePicker } from 'components/ui'
import dayjs from 'dayjs'
import { fetchFeed } from 'services/NasaAPI'
import Actions from './components/Actions'
import { FAVORITES_LS_KEY } from 'constants/app.constant'
import { getFavorites } from 'services/localStorage'
import { useNavigate } from 'react-router-dom'

const columns = ({ actions }) => [
  {
    header: 'Id',
    accessor: 'id',
    cell: (props) => {
      const { id } = props.row.original
      return (
        <div className="flex items-center gap-3">
          <span>{id}</span>
        </div>
      )
    },
  },
  {
    header: 'Name',
    sortable: true,
    accessor: 'name',
    cell: (props) => {
      const { name } = props.row.original
      return (
        <div className="flex items-center gap-3">
          <span>{name}</span>
        </div>
      )
    },
  },
  {
    header: 'Absolute Magnitude H',
    accessor: 'absolute_magnitude_h',
    cell: (props) => {
      const { absolute_magnitude_h } = props.row.original
      return (
        <div className="flex items-center">
          {absolute_magnitude_h}
        </div>
      )
    },
  },
  {
    header: 'Diameter min (meters)',
    accessor: 'estimated_diameter.meters.estimated_diameter_min',
    cell: (props) => {
      const { estimated_diameter } = props.row.original
      return (
        <div className="flex items-center">
          {estimated_diameter.meters.estimated_diameter_min} 
        </div>
      )
    },
  },
  {
    header: 'Diameter max (meters)',
    accessor: 'estimated_diameter.meters.estimated_diameter_max',
    cell: (props) => {
      const { estimated_diameter } = props.row.original
      return (
        <div className="flex items-center">
          {estimated_diameter.meters.estimated_diameter_max} 
        </div>
      )
    },
  },
  {
    header: '',
    id: 'action',
    cell: (props) => {
      const { id } = props.row.original
      return (
        <div className='flex gap-4'>
          {actions({ id })}
        </div>
      )
    },
  },
]

const todayDate = dayjs(new Date())
    .startOf('day')
    .toDate()
const day7AfterToday = dayjs(new Date()).add(7, 'day').toDate()

const Asteroids = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [sortData, setSortData] = useState({ sort_by: 'name', sort_order: 'desc' });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState([
    todayDate,
    day7AfterToday,
]);

  const getFeed = async ({ sort_by = 'name', sort_order = 'asc', ...rest } = {}) => {
    try {
      setLoading(true);
      setError(null);
      const resposne = await fetchFeed({ sort_by, sort_order, ...rest });
      setData(resposne.map(item => ({
        ...item,
        isFavorite: getFavorites().includes(item.id)
      })));
    } catch (e) {
      console.error('error', e)
      setError(e.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      const start_date = dayjs(dateRange[0]).format('YYYY-MM-DD')
      const end_date = dayjs(dateRange[1]).format('YYYY-MM-DD')
      const { sort_by, sort_order } = sortData
      getFeed({ start_date, end_date, sort_by, sort_order })
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange, sortData])


  const onSort = ({ order: sort_order, key: sort_by }) => {
    setSortData({ sort_by, sort_order });
  }

  const handleRangePickerChange = (date) => {
    setDateRange(date)
  }

  const toggleFavorite = ({ id }) => {
    let favorites = JSON.parse(window.localStorage.getItem(FAVORITES_LS_KEY)) || [];
    if (favorites.includes(id)) {
      // remove from it
      favorites = favorites.filter(itemId => String(itemId) !== String(id));
    } else {
      // add to it
      favorites.push(id);
    }

    // refresh memory
    window.localStorage.setItem(FAVORITES_LS_KEY, JSON.stringify(favorites))
    setData(data.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isFavorite: !favorites.includes(id)
        };
      }

      return item;
    }));
  }

  return (
    <AdaptableCard>
      <div className='mb-4 flex flex-row gap-4 align-items-center justify-end'>
        <h3 className="flex mb-4 lg:mb-0 flex-1">Asteroids</h3>
        <div>
          <DatePicker.DatePickerRange
            placeholder="Select dates range"
            defaultValue={dateRange}
            value={dateRange}
            onChange={handleRangePickerChange}
          />
        </div>
      </div>

      <DataTable
        columns={columns({
          actions: ({ id }) => 
            <Actions
              id={id}
              onAction1={toggleFavorite}
              onAction2={() => navigate(`/asteroids/${id}`)}
            />
        })}
        data={data}
        loading={loading}
        onSort={onSort}
      />

      {error && <div className='mt-4 justify-center flex'>{error}</div>}
    </AdaptableCard>
  )
}

export default Asteroids
