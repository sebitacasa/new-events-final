import { enIE } from "date-fns/locale";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders, getAllEvent } from "../redux/actions/actions";
import {
    Container,
    Card,
    Row,
    Table,
    Col,
    Form,
    Button,
    Modal,
} from "react-bootstrap";


/* import { App } from "./graficoBarras"; */


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Metricas() {
    const dispatch = useDispatch();
    const objetos = useSelector((state) => state.eventosBack)
    console.log(objetos, "soy las objetos")

    useEffect(() => {
        dispatch(getAllOrders());
        dispatch(getAllEvent());
    }, [dispatch]);

    try {
        const orders = useSelector((state) => state.allOrders);
        /* const objetos = useSelector((state) => state.eventosBack) */

        console.log(orders, "soy las ordenes")
        /* console.log(objetos, "soy las objetos") */

        const ticketsito = orders.orders.map(e => e.Tickets)
        console.log(ticketsito, "orders");




        let ids;
        let coleccion = []
        let coleccionFechasOrdenes = []
        for (let i = 0; i < ticketsito.length; i++) {
            ids = ticketsito[i].map(e => e.EventId)

            coleccion.push(ids.join(',')/* .split(' ') */)
            console.log(coleccion, "soy la coleccion")

        }

        let coleccionDeEventId = coleccion.join(',')
        console.log(coleccionDeEventId.toString(), "soy coleccioneventid")
        // AHORA DEBO SEPARARLO POR LAS COMAS

        let coleccionSeparadaPorComas = coleccionDeEventId.split(',')

        console.log(coleccionSeparadaPorComas, "soy separado por comas")

        // AHORA QUIERO HACER EL SORT
        console.log(coleccionSeparadaPorComas.sort(), "soy EL SORT")

        //TENGO EL SORT LISTO
        let coleccionConSort = coleccionSeparadaPorComas.sort()


        //DESDE AQUI APLICARE EL VIDEO DE YOU TUBE
        let unicosElementos = []
        let almacenadorDeVecesRepetidas = []

        let contador = 1

        for (let i = 0; i < coleccionConSort.length; i++) {
            if (coleccionConSort[i + 1] === coleccionConSort[i]) {
                console.log(coleccionConSort[i], "soy la vez")
                contador++
            } else {
                unicosElementos.push(coleccionConSort[i])
                almacenadorDeVecesRepetidas.push(contador)
                contador = 1
            }
        }
        console.log(unicosElementos, "soy unicos elementos")
        console.log(almacenadorDeVecesRepetidas, "soy almacenador de veces repetidas")

        //-------------------------------------------------------------------------------------
        
        //----------------------------------------------------------------------------------------------------- */

        //tengo los ids de los eventos pero ahora quiero el nombre
        let nombres = []
        let precios = []

        for (let n = 0; n < objetos.length; n++) {
            for (let p = 0; p < unicosElementos.length; p++) {
                if (objetos[n].id === unicosElementos[p]) {
                    nombres.push(objetos[n].title)
                    precios.push(objetos[n].cost)
                }
            }
        }


        console.log(nombres, "soy los nombre")
        console.log(precios, "soy los precios")

        //-------------------------------------------------------------------------------------------------

        //necesito que el array de cantidad vaya de mayor a menor (ranking)
        //pero que a la vez me acomode el array de los ids



        for (let i = 0; i < almacenadorDeVecesRepetidas.length - 1; i++) {

            for (let j = 0; j < almacenadorDeVecesRepetidas.length - i - 1; j++) {
                if (almacenadorDeVecesRepetidas[j] < almacenadorDeVecesRepetidas[j + 1]) {
                    [almacenadorDeVecesRepetidas[j], almacenadorDeVecesRepetidas[j + 1]] = [almacenadorDeVecesRepetidas[j + 1], almacenadorDeVecesRepetidas[j]];
                    [unicosElementos[j], unicosElementos[j + 1]] = [unicosElementos[j + 1], unicosElementos[j]];
                    [nombres[j], nombres[j + 1]] = [nombres[j + 1], nombres[j]];
                    [precios[j], precios[j + 1]] = [precios[j + 1], precios[j]];

                }
            }
        }


        console.log((almacenadorDeVecesRepetidas), "almacenador ordenado")
        console.log(unicosElementos, "unicos elementos ordenados")

        //-----------------------------------------------------------------------------------------------------

        //-----------------------------------------------------------------------------------------------------

        //tambien me interesa los meses con mas ventas ------------------------------------------------------
        //debo traerme las orders y extraer el date guardandolo en un array

        /* let info = "Fri May 13 2022 16:47:41 GMT-0300 (hora estándar de Argentina)" */
        let fechas = orders.orders.map(e => e.date)
        console.log(fechas, " asi me llega la info de la orden")


        let soloMes = []
        for (let b = 0; b < fechas.length; b++) {
            soloMes.push(formatDate(fechas[b]))
        }

        let soloMesesito = soloMes.join()
        console.log(soloMesesito, "solo mesesito")

        let mesesSeparadaPorComas = soloMesesito.split(',')
        console.log(mesesSeparadaPorComas, "mesesSeparadaPorComas")



        let mesesConSort = mesesSeparadaPorComas.sort()
        console.log(mesesConSort, " meses de las ordenes con sort")


        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            let mayo = 0

            return [/* year,  */month/* , day */]/* .join('-') */;

        }

        //DESDE AQUI APLICARE EL VIDEO DE YOU TUBE (PARA LOS MESES)
        let unicosElementosMeses = []
        let almacenadorDeVecesRepetidasMeses = []

        let contadorMeses = 1

        for (let i = 0; i < mesesConSort.length; i++) {
            if (mesesConSort[i + 1] === mesesConSort[i]) {
                console.log(mesesConSort[i], "soy la vez")
                contadorMeses++
            } else {
                unicosElementosMeses.push(mesesConSort[i])
                almacenadorDeVecesRepetidasMeses.push(contadorMeses)
                contadorMeses = 1
            }
        }
        console.log(unicosElementosMeses, "soy unicos elementos de meses")
        console.log(almacenadorDeVecesRepetidasMeses, "soy almacenador de veces repetidas en meses")

        // esto es para el ranking de meses
        for (let i = 0; i < almacenadorDeVecesRepetidasMeses.length - 1; i++) {

            for (let j = 0; j < almacenadorDeVecesRepetidasMeses.length - i - 1; j++) {
                if (almacenadorDeVecesRepetidasMeses[j] < almacenadorDeVecesRepetidasMeses[j + 1]) {
                    [almacenadorDeVecesRepetidasMeses[j], almacenadorDeVecesRepetidasMeses[j + 1]] = [almacenadorDeVecesRepetidasMeses[j + 1], almacenadorDeVecesRepetidasMeses[j]];
                    [unicosElementosMeses[j], unicosElementosMeses[j + 1]] = [unicosElementosMeses[j + 1], unicosElementosMeses[j]];
                }
            }
        }

        // --------------------------------------------------------------------------------------------------
        const options = {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    /* position: 'top' as const, */
                },
                title: {
                    display: true,
                    text: 'Meses con mayores ventas',
                },
            },
        };

        const labels = [unicosElementosMeses];

        const data = {
            labels,
            datasets: [
                {
                    label: 'Cantidad de ordenes por mes',
                    data: (almacenadorDeVecesRepetidasMeses),
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        };

        function App() {
            return <Bar options={options} data={data} />;
        }

        //-----------------------------------------------------------------------------------------------------------
        //promedio de facturacion
        let sumita = 0;
        for (let t=0; t<almacenadorDeVecesRepetidas.length; t++){
            sumita += almacenadorDeVecesRepetidas[t]*precios[t]
            console.log(sumita, "soy sumita") 
        }
        let promedio = Math.round((sumita/almacenadorDeVecesRepetidas.length))
        console.log(promedio)

        return (
            <div style={{background: "#1C2833 "}} >
                <Container  bg="white" mt={5} mb={5}>
                    <div>
                        <h2 style={{color: "#f0ad4e "}} >Ranking de los eventos mas vendidos</h2>
                    </div>
                    <Row>
                        <Col style={{background: "#f0ad4e "}}  >
                            {/* <div className="p-1 py-5"> */}
                            <Table striped hover>
                                <thead >
                                    <tr  >
                                        <th >#</th>
                                        <th>Id del evento</th>
                                        <th>Nombre del evento</th>
                                        <th>Cantidad de entradas</th>
                                        <th>Facturacion</th>
                                        <th>Ganancia</th>
                                        <th> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {unicosElementos?.map((unicosElementos, index) => index < 10 && (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{unicosElementos}</td>
                                            <td>{nombres[index]}</td>
                                            <td>{almacenadorDeVecesRepetidas[index]}</td>
                                            <td>$ {almacenadorDeVecesRepetidas[index] * precios[index]}</td>
                                            <td>$ {((almacenadorDeVecesRepetidas[index] * precios[index]) * 10) / 100}</td>

                                        </tr>
                                    ))}


                                </tbody>
                            </Table>
                            {/* </div> */}
                        </Col>
                    </Row>
                </Container>
                        <div style={{marginTop: "75px"}}>
                <>
                    {[
                        'Primary',
                    ].map((variant) => (
                        <Card
                            bg={variant.toLowerCase()}
                            key={variant}
                            text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                            style={{ width: '100%', maringTop: "50px" }}
                            className="mb-2"
                        >
                            <Card.Header>Evento Estrella</Card.Header>
                            <Card.Body>
                                <Card.Title> {nombres[0]}</Card.Title>
                                {/* <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text> */}
                            </Card.Body>
                        </Card>
                    ))}
                </>

                <>
                    {[
                        'Success',
                    ].map((variant) => (
                        <Card
                            bg={variant.toLowerCase()}
                            key={variant}
                            text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                            style={{ width: '100%', maringTop: "50px" }}
                            className="mb-2"
                        >
                            <Card.Header>Facturación máxima</Card.Header>
                            <Card.Body>
                                <Card.Title> ${almacenadorDeVecesRepetidas[0] * precios[0]}</Card.Title>
                                {/* <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text> */}
                            </Card.Body>
                        </Card>
                    ))}
                </>

                

                <>
                    {[
                        'Info',
                    ].map((variant) => (
                        <Card
                            bg={variant.toLowerCase()}
                            key={variant}
                            text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                            style={{ width: '100%', maringTop: "50px" }}
                            className="mb-2"
                        >
                            <Card.Header>Facturación promedio</Card.Header>
                            <Card.Body>
                                <Card.Title> ${promedio}</Card.Title>
                                {/* <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text> */}
                            </Card.Body>
                        </Card>
                    ))}
                </>

                <>
                    {[
                        'Warning',
                    ].map((variant) => (
                        <Card
                            bg={variant.toLowerCase()}
                            key={variant}
                            text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                            style={{ width: '100%', maringTop: "50px" }}
                            className="mb-2"
                        >
                            <Card.Header>Ganancia promedio</Card.Header>
                            <Card.Body>
                                <Card.Title> ${(promedio*10)/100}</Card.Title>
                                {/* <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text> */}
                            </Card.Body>
                        </Card>
                    ))}
                </>
                </div>

                <div className="p-1 py-5">

                </div>


                <Container style={{background: "#f0ad4e "}}bg="white" mt={5} mb={5}>
                    <div>
                        <h2 style={{color: "black "}} >Ranking de los meses con mas ventas</h2>
                    </div>

                    <Table striped hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Mes</th>
                                <th>Cantidad de ordenes</th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {unicosElementosMeses?.map((unicosElementosMeses, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{unicosElementosMeses}</td>
                                    <td>{almacenadorDeVecesRepetidasMeses[index]}</td>


                                </tr>
                            ))}


                        </tbody>
                    </Table>
                </Container>

                <div  >
                    <App options={options} data={data} />
                </div>





            </div>




        )

    } catch (error) {
        console.log(error)
    }


}