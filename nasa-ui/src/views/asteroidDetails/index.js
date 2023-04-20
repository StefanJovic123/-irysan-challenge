import { Loading } from 'components/shared'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineArrowLeft, AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { fetchFeedItem } from 'services/NasaAPI'
import { getFavorites } from 'services/localStorage'

const AsteroidDetails = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});

  const getFeedItem = async () => {
    try {
      setData({})
      setLoading(true)
      const response = await fetchFeedItem(params.id)
      setData(response)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
    
  }
  useEffect(() => {
    getFeedItem();
  }, []);

  const skipKeys = ['close_approach_data', 'links', 'orbital_data', 'estimated_diameter', 'orbit_class']

  if (loading) {
    return <Loading loading={true} />
  }

  if (!data) {
    return null;
  }

  if (error) {
    return <div>{error}</div>
  }

  const isFavorite = getFavorites().includes(data.id);

  return (
    <div>
      <div >
        <Link to='/' className='flex gap-2 items-center hover:underline'>
          <AiOutlineArrowLeft />
          Back to asteroids list
        </Link>
      </div>
      

      <div className='mt-6 flex flex-col gap-2'>
        <h4 className='flex items-center gap-4'>
          {data?.name}
          {!isFavorite ? <AiOutlineStar /> : <AiFillStar color='green' />}
        </h4>
        <div>id: {data?.id}</div>
        {Object.keys(data).filter(item => !skipKeys.includes(item)).map(fieldKey => (
          <div className='flex gap-2' key={fieldKey}>
            <span className='text-black'>{fieldKey}:</span>
            <span className='text-gray'>{String(data[fieldKey])}</span>
          </div>
        ))}

        <div className='mt-4'>
          <h5>Orbital Data</h5>
          {Object.keys(data?.orbital_data).filter(item => !skipKeys.includes(item)).map(fieldKey => (
          <div className='flex gap-2' key={fieldKey}>
            <span className='text-black'>{fieldKey}:</span>
            <span className='text-gray'>{String(data?.orbital_data[fieldKey])}</span>
          </div>
        ))}
        </div>

        <div className='mt-4'>
          <h5>Orbit Class</h5>
          {Object.keys(data?.orbital_data.orbit_class).filter(item => !skipKeys.includes(item)).map(fieldKey => (
          <div className='flex gap-2' key={fieldKey}>
            <span className='text-black'>{fieldKey}:</span>
            <span className='text-gray'>{String(data?.orbital_data.orbit_class[fieldKey])}</span>
          </div>
        ))}
        </div>
        
      </div>
    </div>
  )
};

export default AsteroidDetails;
