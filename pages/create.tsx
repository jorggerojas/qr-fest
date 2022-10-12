import type { NextPage } from 'next'
import QRCode from 'qrcode'
import { useRef, useState } from 'react'
import { Button, Header } from '../components'
import { useFormik } from 'formik'
import * as yup from 'yup'

type initialValues = {
  email: string
  name: string
  phone: string
  willSleepThere: boolean
  willBringInvitees: boolean
  inviteesNumber: number
  inviteesNames: string[]
}

const initialValues: initialValues = {
  email: '',
  name: '',
  phone: '',
  willSleepThere: false,
  willBringInvitees: false,
  inviteesNumber: 0,
  inviteesNames: [],
}

const createQRScheme = yup.object({
  email: yup.string().email('Email no válido').required('Campo equerido'),
  name: yup.string().required('Campo equerido'),
  phone: yup
    .string()
    .min(10, 'Número de teléfono no válido')
    .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {
      message: 'Sólo números',
    })
    .required('Campo equerido')
    .test('phone', 'Número de teléfono no válido', (value) => {
      if (value) {
        return value.length === 10 && !isNaN(Number(value))
      }
      return false
    }),
  willSleepThere: yup.boolean().default(false),
  willBringInvitees: yup.boolean().default(false),
  inviteesNumber: yup.number().default(0),
  inviteesNames: yup.array().of(yup.string().required()),
})

const Create: NextPage = () => {
  const [isQRGenerated, setIsQRGenerated] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const createQRCode = async (text: string) => {
    if (canvasRef && canvasRef.current) {
      await QRCode.toCanvas(canvasRef.current, text, {
        errorCorrectionLevel: 'H',
      })
      setIsQRGenerated(true)
    }
  }
  const formik = useFormik({
    initialValues,
    validationSchema: createQRScheme,
    onSubmit: async (values) => {
      await createQRCode(JSON.stringify(values))
    },
  })
  return (
    <div>
      <Header />
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name ? <div>{formik.errors.name}</div> : null}
        <label htmlFor="phone">Teléfono</label>
        <input
          id="phone"
          name="phone"
          type="text"
          maxLength={10}
          onChange={formik.handleChange}
          value={formik.values.phone}
        />
        {formik.errors.phone ? <div>{formik.errors.phone}</div> : null}
        <label htmlFor="willSleepThere">
          ¿Dormirás ahí?
          <input
            id="willSleepThere"
            name="willSleepThere"
            type="checkbox"
            onChange={formik.handleChange}
            checked={formik.values.willSleepThere}
          />
        </label>
        <label htmlFor="willBringInvitees">
          ¿Traerás invitados?
          <input
            id="willBringInvitees"
            name="willBringInvitees"
            type="checkbox"
            onChange={formik.handleChange}
            checked={formik.values.willBringInvitees}
          />
        </label>
        {formik.values.willBringInvitees ? (
          <>
            <label htmlFor="inviteesNumber">Número de invitados</label>
            <input
              id="inviteesNumber"
              name="inviteesNumber"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.inviteesNumber}
            />
            {formik.errors.inviteesNumber ? (
              <div>{formik.errors.inviteesNumber}</div>
            ) : null}
            {Array.from(Array(formik.values.inviteesNumber).keys()).map(
              (index) => (
                <div key={index}>
                  <label htmlFor={`inviteesNames.${index}`}>
                    Nombre del invitado {index + 1}
                  </label>
                  <input
                    id={`inviteesNames.${index}`}
                    name={`inviteesNames.${index}`}
                    type="text"
                    onChange={(e) => {
                      const { value } = e.target
                      const list: string[] = [...formik.values.inviteesNames]
                      list[index] = value
                      formik.setValues({
                        ...formik.values,
                        inviteesNames: [...list],
                      })
                    }}
                    value={formik.values.inviteesNames[index]}
                  />
                  {formik.errors.inviteesNames ? (
                    <div>{formik.errors.inviteesNames[index]}</div>
                  ) : null}
                </div>
              )
            )}
          </>
        ) : null}
        <Button type="submit" variant="action">
          Crear QR
        </Button>
      </form>
      <canvas ref={canvasRef}></canvas>
      {isQRGenerated && JSON.stringify(formik.values)}
    </div>
  )
}

export default Create
