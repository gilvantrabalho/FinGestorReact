import React from 'react'

import InputIconComponent from '../../../components/inputIconComponent/InputIconComponent'
import AreaGrid from '../../../components/areaGrid/AreaGrid'
import Table from '../../../components/table/Table'
import ValuesApi from '../../../api/ValuesApi'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Alerts from '../../../helpers/alerts/Alerts'
import CardComponent from '../../../components/cardComponent/CardComponent'
import LayoutDashComponent from '../../../components/layoutDashComponent/LayoutDashComponent'
import Button from '../../../components/button/Button'
import CardContainer from '../../../components/cardContainer/CardContainer'

const MySwal = withReactContent(Swal)

const Home = () => {

  const [value, setValue] = React.useState('')
  const [type, setType] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [values, setValues] = React.useState([])

  let [totalEntry, setTotalEntry] = React.useState(0)
  let [totalOutput, setTotalOutput] = React.useState(0)
  let [netTotal, setNetTotal] = React.useState(0)

  React.useEffect(() => {
    ValuesApi.getAllValues(localStorage.getItem('id'))
      .then(resp => {
        setValues(resp.data)

        totalEntry = 0
        totalOutput = 0
        for (let i = 0; i < resp.data.length; i++) {
          if (resp.data[i].type == 'Entrada') {
            totalEntry += parseFloat(resp.data[i].value)
          } else {
            totalOutput += parseFloat(resp.data[i].value)
          }
        }
        setTotalEntry(totalEntry)
        setTotalOutput(totalOutput)
        setNetTotal(totalEntry - totalOutput)
      })
  }, [])

  function destroy(data) {
    MySwal.fire({
      title: 'Tem certeza?',
      text: `Deseja excluir "${data.description}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        ValuesApi.deleteItem(data.id)
          .then(resp => {
            if (resp.status == 200) {
              setValues(values.filter((values) => values.id !== data.id))

              if (data.type == "Entrada") {
                setTotalEntry(totalEntry - parseFloat(data.value))
                setNetTotal(netTotal - parseFloat(data.value))

              } else {
                setTotalOutput(totalOutput - parseFloat(data.value))
                setNetTotal(netTotal + parseFloat(data.value))
              }

              Swal.fire(
                'Deletado!',
                'Item foi deletado com sucesso.',
                'success'
              )
            } else {
              Alerts.danger('Erro ao tentar deletar item!')
            }

          }).catch(error => {
            Alerts.danger("Erro ao tentar deletar. Tente novamente!")
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          })
      }
    })
  }

  const submit = (e) => {
    e.preventDefault()

    if (value && type && description) {
      ValuesApi.register({
        user_id: localStorage.getItem('id'),
        description: description,
        type: type,
        value: value
      })
        .then((resp) => {
          if (resp.data) {
            setValues([...values, {
              id: resp.data.id,
              description: description,
              type: type,
              value: value
            }])

            let TE = 0
            let TS = 0
            if (resp.data.type == 'Entrada') {
              setTotalEntry(totalEntry + parseFloat(resp.data.value))
              TE = totalEntry + parseFloat(resp.data.value)
            } else {
              setTotalOutput(totalOutput + parseFloat(resp.data.value))
              TS = totalOutput + parseFloat(resp.data.value)
            }

            if (TE == 0) TE = totalEntry
            if (TS == 0) TS = totalOutput

            setNetTotal(TE - TS)
            setValue('')
            setType('')
            setDescription('')
          }
        })
    } else {
      Alerts.danger("Verifique todos os valores informados!")
    }
  }

  return (

    <LayoutDashComponent>
      <div className='container p-0'>
        <div className="row">
          <div className="col-md-4">
            <CardComponent icon="bi-graph-up-arrow" title="Entradas" value={totalEntry} type="E" />
          </div>

          <div className="col-md-4">
            <CardComponent icon="bi-graph-down-arrow" title="Saídas" value={totalOutput} type="S" />
          </div>

          <div className="col-md-4">
            {
              (netTotal < 0)
                ?
                <CardComponent icon="bi-hand-thumbs-down" title="Líquido" value={netTotal} type="S" />
                :
                <CardComponent icon="bi-hand-thumbs-up" title="Líquido" value={netTotal} type="E" />
            }
          </div>
        </div>
      </div>

      <CardContainer>
        <AreaGrid
          left={
            <div>
              <h5>Adicionar</h5>

              <form onSubmit={submit} method='POST' className='mt-3'>

                <InputIconComponent
                  icon={<div>R$</div>}
                  input={
                    <input
                      onChange={e => setValue(e.target.value)}
                      value={value}
                      type="number"
                      className="form-control p-2"
                      placeholder="Informe um valor..."
                      min="0.00"
                      max="10000.00"
                      step="0.01"
                    />
                  }
                />

                <div className="form-group">
                  <select onChange={e => setType(e.target.value)} className="form-select p-2" value={type}>
                    <option value="">Selecione o Tipo...</option>
                    <option value="Entrada">Entrada</option>
                    <option value="Saída">Saída</option>
                  </select>
                </div>

                <div className="form-group mt-3">
                  <textarea onChange={e => setDescription(e.target.value)} value={description} className='form-control' cols="30" rows="3" placeholder='Descrição...'></textarea>
                </div>

                <Button
                  type="submit"
                  class="btn btn-primary shadow-sm"
                  text="Enviar"
                />

              </form>

            </div>
          }

          right={
            <div className='ps-3'>
              <h5 className='border-bottom pb-3'>Entradas/Saídas</h5>

              {
                values.length == 0 ?
                  <h5 className="text-center">Não há valores cadastrados!</h5>

                  :
                  <Table
                    headers={
                      [
                        { value: 'Descricao' },
                        { value: 'Tipo', center: true },
                        { value: 'Valor', center: true },
                        { value: '' }
                      ]
                    }
                  >
                    {
                      values.map((item, index) => (
                        <tr key={index} className={item.type == "Entrada" ? "table-success" : "table-danger"}>

                          <td className='align-middle'>{item.description}</td>

                          <td className='text-center align-middle'>
                            <span className={item.type == "Entrada" ? "badge bg-success shadow" : "badge bg-danger shadow"}>Entrada</span>
                          </td>

                          <td className='text-center align-middle' style={{ fontWeight: '500' }}>
                            {parseFloat(item.value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                          </td>

                          <td className='d-flex justify-content-center'>
                            <button onClick={() => { console.log('Editar') }} className="btn btn-sm btn-primary m-1">
                              <i className="bi bi-pencil-fill"></i>
                            </button>
                            <button onClick={() => { destroy(item) }} className="btn btn-sm btn-danger m-1">
                              <i className="bi bi-trash-fill"></i>
                            </button>
                          </td>

                        </tr>
                      ))
                    }
                  </Table>
              }

            </div>
          }
        />
        <br />
      </CardContainer>

    </LayoutDashComponent>

  )

}

export default Home