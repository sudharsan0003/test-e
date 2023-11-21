import React, { useEffect, useState } from 'react';
import { db } from '../firebase.config';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, onSnapshot, doc, getDoc } from 'firebase/firestore';

const initialState = {
  name: '',
  mail: '',
  city: '',
  contact: '',
  password: '',
};

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState([false]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    id && getSingleUser();
    console.log(data);
  }, [id]);

  const getSingleUser = async () => {
    const docRef = doc(db, 'users', id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(
      collection(db, 'users'),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setUsers(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  return (
    <div className='bg-orange-300 h-full w-full flex flex-col'>
      <container>
        <div className='flex gap-96 grid-col-2 p-5 '>
          {users &&
            users.map((item) => (
              <div key={item.id}>
                <section className=' flex flex-col'>
                  <container className=' flex flex-col'>
                    <img
                      src={item.img}
                      sizes='medium'
                      alt='profile img'
                      style={{
                        height: '150px',
                        width: '150px',
                        borderRadius: '50%',
                      }}
                    />
                    <h2>{item.name}</h2>
                    <p>{item.mail}</p>
                  </container>
                  <div className='flex justify-center items-center'>
                    <button
                      onClick={() => navigate(`/registration/${item.id}`)}
                    >
                      Update
                    </button>
                  </div>
                </section>
              </div>
            ))}
        </div>
      </container>
    </div>
  );
};

export default Profile;
