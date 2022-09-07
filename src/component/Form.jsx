import React,{useState,useEffect} from 'react';
import axios from 'axios';
import CreatableSelect from 'react-select/creatable';
import Logo from '../Assets/Logo.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal)
export default function Form() {
  const [Job,setJob] = useState([]);
  const [Skill,setSkill] = useState([]);
  const [valueJob,setValueJob] = useState('');
  const [valueSkill,setValueSkill] = useState();
  const [valueYear,setValueYear] = useState('')
  const [email,setEmail] = useState('');
  const [Name,setName] = useState('');
  const [tel,setTel] = useState('');
  const [Alert,setAlert] = useState(Boolean);
  const history = useNavigate(); 
  // Api-Jobs
  const GetJob = async()=>{
    try {
      const jobs= await axios.get('http://demo73.energeek.co.id/energeek-frontend-test/public/api/select_list/job?search');
      const value = jobs.data.data.jobs;
      const result = value.map(result=>{
        return {
          value : result.id,
          label : result.name
        }
      });
      setJob(result);
    } catch (error) {
      setJob(error)
    }
  };
  // Api Skill
  const GetSkill = async ()=>{
    try {
      const skills= await axios('http://demo73.energeek.co.id/energeek-frontend-test/public/api/select_list/skill?search=');
      const value = skills.data.data.skills;
      const result = value.map(result=>{
        return {
          value : result.id,
          label : result.name
        }
      });
      setSkill(result);
    } catch (error) {
      
    }
  };
  // Api Store/Post;
  const Store = async(event) =>{
    event.preventDefault();
      const Data = {
        name: Name,
        email: email,
        phone:tel,
        birth_year:valueYear.getFullYear(),
        job_id: valueJob['value'],
        skill_id: valueSkill.map(val=>(val['value'])) 
      }
      try {
        const POST = await axios.post('http://demo73.energeek.co.id/energeek-frontend-test/public/api/recruitment',Data);
        if(POST.status===200){
          setAlert(true)
          window.location.reload();
        };
      } catch (error) {
        setAlert(false);
      }
  }
  useEffect(()=>{
    GetJob();
    GetSkill();
  },[]);
 
  return (
    <section className='max-w-screen-xl mx-auto flex flex-col justify-center items-center h-screen'>
      <img src={Logo} className="object-cover w-[230px] self-center mb-2" alt='logo'/>
      <div className='bg-white max-w-lg w-full rounded-lg p-2'>
        <form onSubmit={Store}>
          <div className='w-full flex flex-col gap-5'>
            <h1 className='text-2xl text-center font-bold text-neutral-600'>Apply Lamaran</h1>
            <div className='w-[90%] mx-auto'>
            <label className='text-lg font-bold text-neutral-600'>Jabatan</label>
              <CreatableSelect  options={Job} defaultValue={valueJob} onChange={(value)=>{setValueJob(value)}}
              classNamePrefix="select" placeholder="Pilih Jabatan.." isClearable/>
            </div>
            <div className='w-[90%] mx-auto flex flex-col'>
              <label className='text-lg font-bold text-neutral-600'>Nama</label>
              <input type="text" 
              placeholder='Cth : Ridho' 
              className='border border-gray-400 rounded-md h-[40px] p-2' 
              value={Name} onChange={(e)=>{setName(e.target.value)}}
              />
            </div>
            <div className='w-[90%] mx-auto flex flex-col'>
              <label className='text-lg font-bold text-neutral-600'>Telpon</label>
              <input type="tel" value={tel} onChange={(value)=>{setTel(value.target.value)}} placeholder='Cth : 0812313234' className='border border-gray-400 rounded-md h-[40px] p-2'/>
            </div>
            <div className='w-[90%] mx-auto flex flex-col'>
              <label className='text-lg font-bold text-neutral-600'>Email</label>
              <input type="email" value={email} onChange={(value)=>{setEmail(value.target.value)}} placeholder='Cth : Email@gmail.com' className='border border-gray-400 rounded-md h-[40px] p-2' required/>
            </div>
            <div className='w-[90%] mx-auto flex flex-col'>
              <label htmlFor="year"  className='text-lg font-bold text-neutral-600'>Tahun lahir</label>
              <DatePicker selected={valueYear} onChange={(value) => setValueYear(value)} showYearPicker dateFormat="yyyy"
               placeholder="Pilih Tahun.." className='border w-full border-gray-400 rounded-md h-[40px] p-2'/>
            </div>
            <div className='w-[90%] mx-auto'>
              <label className='text-lg font-bold text-neutral-600'>Skill</label>
              <CreatableSelect isMulti  options={Skill} defaultValue={valueSkill} onChange={setValueSkill}
              classNamePrefix="select" placeholder="Pilih Jabatan.."/>
            </div>
            <button className='w-[90%] mx-auto bg-red-400 h-[50px] text-xl font-bold text-white rounded-md'>Apply</button>
          </div>
        </form>
        { Alert? MySwal.fire({
           title: <strong>BERHASIL!</strong>,
           html: <i>lamaran berhasil Dikirim!</i>,
           icon: 'success'
        }) :null }
      </div>
    </section>
  )
}
