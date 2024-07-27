import './App.css'
import React, {useState} from 'react';

// Определение интерфейса для данных ответа
interface ResponseData {
    // Замените этот интерфейс на соответствующую структуру данных вашего API
    [key: string]: string;
}

const App: React.FC = () => {

    const [data, setData] = useState<ResponseData | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const [idInstance, setIdInstance] = useState<string>(import.meta.env.VITE_APP_GREEN__ID_INSTANCE);
    const [apiTokenInstance, setApiTokenInstance] = useState<string>(import.meta.env.VITE_APP_GREEN_API_TOKEN_INSTANCE);

    //  useEffect(() => {
    //  const url = "";

    // Определите обработчик события
    const getSettingsHandle = (/*event: React.MouseEvent<HTMLButtonElement, MouseEvent>*/): void => {
        console.log('getSettingsHandle')
        fetchData()
    }

    const fetchData = async () => {
        const apiUrl = import.meta.env.VITE_APP_GREEN_API_URL
        const method = `getSettings`

        try {
            const response = await fetch(`${apiUrl}/${idInstance}/${method}/${apiTokenInstance}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    /*const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const data = {
            name: name,
            email: email,
            message: message,
        };

        try {
            const response = await axios.post('https://example.com/api/send', data);
            console.log(response.data);
            alert('Data sent successfully!');
        } catch (error) {
            console.error('Error sending data:', error);
            alert('Error sending data.');
        }
    };*/

    //   fetchData()
//    }, [])


    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        console.log(error)
        //  return <div>Error: {error}</div>
    }

    return (
        <>
            <div className="container  px-4 py-6">
                <div className="flex flex-wrap -mx-4">

                    <div className="w-full md:w-1/2 px-4 mb-6 md:mb-0">
                        <div className="mb-4">
                            <label htmlFor="idInstance" className="block text-gray-700">idInstance</label>
                            <input type="text" id="idInstance" name="idInstance"
                                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   placeholder="idInstance"
                                   value={idInstance}
                                   onChange={(e) => setIdInstance(e.target.value)}
                                   required/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="apiTokenInstance" className="block text-gray-700">ApiTokenInstance</label>
                            <input type="text" id="apiTokenInstance" name="apiTokenInstance"
                                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   placeholder="apiTokenInstance"
                                   value={apiTokenInstance}
                                   onChange={(e) => setApiTokenInstance(e.target.value)}
                                   required/>
                        </div>
                        <div className="mb-6">
                            <button onClick={getSettingsHandle} type="button"
                                    className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">getSettings
                            </button>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="idInstance" className="block text-gray-700">idInstance</label>
                            <input type="text" id="idInstance" name="idInstance"
                                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   placeholder="idInstance"
                                   value={idInstance}
                                   onChange={(e) => setIdInstance(e.target.value)}
                                   required/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="apiTokenInstance" className="block text-gray-700">ApiTokenInstance</label>
                            <input type="text" id="apiTokenInstance" name="apiTokenInstance"
                                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   placeholder="apiTokenInstance"
                                   value={apiTokenInstance}
                                   onChange={(e) => setApiTokenInstance(e.target.value)}
                                   required/>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 px-4">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="container  p-4">
                                <h1 className="text-2xl font-bold mb-4">API Response</h1>
                                <pre className="bg-gray-100 p-4 rounded-lg text-justify">
                                    <code>
                                        {JSON.stringify(data, null, 2)}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default App
