import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [task, setTask] = useState([{ fname: "", lname: 0 }])
  const [data, setData] = useState({
    yourName: '',
    yourNumber: '',
    yourEmail: '',
    bankName: '',
    accountType: '',
    accountNumber: '',
    bankIfsc: '',
    invoiceNumber: Math.floor(Math.random() * 10000),
    invoiceCreated: '',
    invoiceDue: '',
    companyName: '',
    customerName: '',
    companyEmail: '',
    items: {
      // "A new website from scratch on the latest technology.": 13500,
      // "SPA for speed optimization.": 1000,
      // "Functional form section, to get photos over mail.": 1500,
      // "Bilingual functionality": 2000,
      // "2 Plugins/extensions installation": 0,
      // "2 revisions and upto 5 pages in a product": 0
    },
    totalPrice: ''
  });

  // Assuming 'items' is your existing object
  // items["New Item"] = 2500;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  // container function to generate the Invoice
  const generateInvoice = e => {
    e.preventDefault();
    // logic to insert data into items section
    // var temp = JSON.parse(task);
    var totalVal = 0;
    task.forEach((item, index) => {
      // console.log(`Item ${index + 1}`);
      // console.log(`First Name: ${item.fname}`);
      // console.log(`Last Name: ${item.lname}`);
      // console.log('---');
      data.items[item.fname] = item.lname;
      totalVal += Number(item.lname);
    });
    data.totalPrice = totalVal;
    // send a post request with the name to our API endpoint
    const fetchData = async () => {
      const currentURL = window.location.href;
      const url = new URL(currentURL);
      const domainHost = url.origin;
      const dataa = await fetch(`${domainHost}/api/generate-invoice`, {
        method: 'POST',
        body: JSON.stringify({ data }),
      });
      // convert the response into an array Buffer
      return dataa.arrayBuffer();
    };

    // convert the buffer into an object URL
    const saveAsPDF = async () => {
      const buffer = await fetchData();
      const blob = new Blob([buffer]);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'invoice.pdf';
      link.click();
    };

    saveAsPDF();
  };

  // Dynamic form section
  
  const addNewFields = (e) => {
    e.preventDefault();
    setTask([...task, { fname: "", lname: 0 }])
  }

  const handleChange = (e, i) => {
    const { name, value } = e.target
    const onchangeVal = [...task]
    onchangeVal[i][name] = value
    setTask(onchangeVal)
  }

  const handleDelete = (e, i) => {
    e.preventDefault();
    const deleteVal = [...task]
    deleteVal.splice(i, 1)
    setTask(deleteVal)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Generate Customer Invoice</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Hello {data.yourName} 👋</h1>

        <p className={styles.description}>
          Fill the form below to generate your invoice
        </p>

        <form className={styles.form}>
          {/* Form Started */}
          <div className={styles.field}>
            <label htmlFor='yourName'>Your Name</label>
            <input
              id='yourName'
              type='text'
              name='yourName'
              value={data.yourName}
              onChange={onChangeHandler}
            />

            <label htmlFor='yourNumber'>Your PhoneNo</label>
            <input
              id='yourNumber'
              type='number'
              name='yourNumber'
              value={data.yourNumber}
              onChange={onChangeHandler}
            />

            <label htmlFor='yourEmail'>Your Email</label>
            <input
              id='yourEmail'
              type='email'
              name='yourEmail'
              value={data.yourEmail}
              onChange={onChangeHandler}
            />

            <label htmlFor='bankName'>Bank Name</label>
            <input
              id='bankName'
              type='text'
              name='bankName'
              value={data.bankName}
              onChange={onChangeHandler}
            />

            <label htmlFor='accountType'>Account Type</label>
            <input
              id='accountType'
              type='text'
              name='accountType'
              value={data.accountType}
              onChange={onChangeHandler}
            />

            <label htmlFor='accountNumber'>Account Number</label>
            <input
              id='accountNumber'
              type='text'
              name='accountNumber'
              value={data.accountNumber}
              onChange={onChangeHandler}
            />

            <label htmlFor='bankIfsc'>Bank IFSC Code</label>
            <input
              id='bankIfsc'
              type='text'
              name='bankIfsc'
              value={data.bankIfsc}
              onChange={onChangeHandler}
            />

            <label htmlFor='invoiceCreated'>Invoice Created</label>
            <input
              id='invoiceCreated'
              type='date'
              name='invoiceCreated'
              value={data.invoiceCreated}
              onChange={onChangeHandler}
            />

            <label htmlFor='invoiceDue'>Invoice Due</label>
            <input
              id='invoiceDue'
              type='date'
              name='invoiceDue'
              value={data.invoiceDue}
              onChange={onChangeHandler}
            />

            <label htmlFor='companyName'>Company Name</label>
            <input
              id='companyName'
              type='text'
              name='companyName'
              value={data.companyName}
              onChange={onChangeHandler}
            />

            <label htmlFor='customerName'>Customer Name</label>
            <input
              id='customerName'
              type='text'
              name='customerName'
              value={data.customerName}
              onChange={onChangeHandler}
            />

            <label htmlFor='companyEmail'>Company Email</label>
            <input
              id='companyEmail'
              type='email'
              name='companyEmail'
              value={data.companyEmail}
              onChange={onChangeHandler}
            />

            {/* Items section */}
            <h3>Items</h3>
            <button onClick={addNewFields} className={styles.button1}>Add New Item</button>
            <div className={styles.flexibox}>
            {
              task.map((val, i) =>
                <div className={styles.flexiboxchild}>
                  <input type='text' name="fname" value={val.fname} onChange={(e) => handleChange(e, i)} />
                  <input type='number' name="lname" value={val.lname} onChange={(e) => handleChange(e, i)} />
                  <button onClick={(e) => handleDelete(e, i)}>Delete</button>
                </div>
              )
            }
            </div>
            {/* <p>{JSON.stringify(task)}</p> */}

            {/* {items section ends} */}
            {/* Form ended */}
          </div>

          <button onClick={generateInvoice} className={styles.button}>Download Invoice</button>
        </form>
      </main>
    </div>
  );
}
