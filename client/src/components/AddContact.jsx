import React from 'react'
import { useForm } from 'react-hook-form';

const AddContact = () => {

    const { register, handleSubmit } = useForm();


 return (
    <div className='max-w-xl mx-auto border border-gray-200 rounded-md bg-gray-50'>
      <form onSubmit={handleSubmit()}>
        <div className='flex items-center justify-between p-2'>
          <div className='flex flex-col'>
            <div className='flex items-center py-1.5 flex-1'>
              <label
                htmlFor='name'
              >
                Name:
              </label>
              <input
                type='text'
                {...register('name', { required: true })}
              />
            </div>
            <div>
              <label
                htmlFor='description'
              >
                Email: 
              </label>
              <input
                type='text'
                {...register('email')}
              />
            </div>
            <div>
              <label
                htmlFor='phone'
              >
                Phone Number: 
              </label>
              <input
                type='text'
                {...register('phone')}
                placeholder='+61'
              />
            </div>
            <div>
              <label
                htmlFor='address'
              >
                Address: 
              </label>
              <input
                type='text'
                {...register('address')}
              />
            </div>
            <div>
              <label
                htmlFor='birthday'
              >
                Birthday: 
              </label>
              <input
                type='text'
                {...register('birthday')}
              />
            </div>
            <div>
              <label
                htmlFor='notes'
              >
                Notes: 
              </label>
              <input
                type='text'
                {...register('notes')}
              />
            </div>
          </div>
          <button>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
 
}

export default AddContact;