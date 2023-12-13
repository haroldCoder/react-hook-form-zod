"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, mappedPlans } from "@/validations/userSchema"
import { PanInfo, animate, motion } from "framer-motion"
import { useState } from "react";

type Inputs = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  dayOfBirth: string;
  weight: string;
  plan: string;
  dateOfBirth: string;
};

export default function Home() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
    resolver: zodResolver(userSchema)
  });
  const [isOpen, setOpen] = useState(false);

  const plansOptions = Object.entries(mappedPlans).map(([key, value]) => (

    <option value={key} key={key}>
      {value}
    </option>

  ));


  console.log(errors);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <form action="" onSubmit={handleSubmit(onSubmit)} className='flex gap-y-10 flex-col w-[40%]'>
        <motion.div
          style={{ originX: 0.5 }}
        >
          <section className='flex flex-col w-[100%] gap-y-2'>
            <label htmlFor="name">Name</label>
            <motion.input whileTap={{ translateX: 50 }} type="text" className="text-gray-600 my-2 p-1 rounded-sm" id='name' {...register("name")} />
            <motion.div
              layout transition={{ duration: 0.3 }}
            >{
                errors.name?.message && <p className="text-red-500">{errors.name?.message}</p>
              }
            </motion.div>
          </section>
        </motion.div>

        <section className='flex flex-col w-[100%] gap-y-2'>
          <label htmlFor="email">Email</label>
          <input type="email" className='text-gray-600 p-1 rounded-sm' id='email'
            {...register("email")} />
          <motion.div
            layout transition={{ duration: 0.3 }}
          >{
              errors.email?.message && <p className="text-red-600">{errors.email?.message}</p>
            }
          </motion.div>
        </section>

        <section className='flex flex-col w-[100%] gap-y-2'>
          <label htmlFor="password">Password</label>
          <input type="password" className='text-gray-600 p-1 rounded-sm' id='password'
            {...register("password")} />
          <motion.div
            layout transition={{ duration: 0.3 }}
          >{
              errors.password?.message && <p className="text-red-600">{errors.password?.message}</p>
            }
          </motion.div>
        </section>

        <section className='flex flex-col w-[100%] gap-y-2'>
          <label htmlFor="repeatpassword">Repeat password</label>
          <input type="repeatpassword" className='text-gray-600 p-1 rounded-sm' id='repeatpassword'
            {...register("repeatPassword")} />
          <motion.div
            layout transition={{ duration: 0.3 }}
          >{
              errors.repeatPassword?.message && <p className="text-red-600">{errors.repeatPassword?.message}</p>
            }
          </motion.div>
        </section>

        <section className='flex flex-col w-[100%] gap-y-2'>
          <label htmlFor="weight">Weight</label>
          <input type="number" className='text-gray-600 p-1 rounded-sm' id='weight'
            {...register("weight")} />
          <motion.div
            layout transition={{ duration: 0.3 }}
          >{
              errors.weight?.message && <p className="text-red-600">{errors.weight?.message}</p>
            }
          </motion.div>
        </section>

        <section className='flex flex-col w-[100%] gap-y-2'>
          <label htmlFor="plan">Plan</label>

          <select className='text-gray-600 p-2 rounded-sm' id="plan"
            {...register("plan")} >
            {plansOptions}

          </select>
          <motion.div
            layout transition={{ duration: 0.3 }}
          >{
              errors.plan?.message && <p className="text-red-600">{errors.plan?.message}</p>
            }
          </motion.div>
        </section>

        <motion.button
          className="bg-gray-700 p-4 rounded-md mb-2"
          type="submit"
          whileHover={{
            scale: 1.2,
            transition: { duration: 1 },
          }}
          whileTap={{ scale: 0.9 }}
        >
          Submit</motion.button>
      </form>

      <div>
        {JSON.stringify(watch(), null, 2)}
      </div>
    </main>
  )
}
