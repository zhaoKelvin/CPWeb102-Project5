import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BreweryDetails = () => {

  let params = useParams();
  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    const getBrewDetail = async () => {
      const details = await fetch(
        `https://api.openbrewerydb.org/v1/breweries/search?query=${params.id}`
      );
      const brewDetail = await details.json();
      console.log(brewDetail)

      setFullDetails(brewDetail);
    };
    getBrewDetail().catch(console.error);
    console.log(fullDetails)
  }, []);

  return (<div>
    <table>
      <tbody>
      <tr>
        <th>Name </th>
        <td>{fullDetails ? fullDetails[0].name : null}</td>
      </tr>
      <tr>
        <th>Brewery Type </th>
        <td>{fullDetails ? fullDetails[0].brewery_type : null} </td>
      </tr>
      <tr>
        <th>Address </th>
        <td>{fullDetails ? fullDetails[0].address_1 : null} </td>
      </tr>
      <tr>
        <th>City </th>
        <td>{fullDetails ? fullDetails[0].city : null} </td>
      </tr>
      <tr>
        <th>Postal Code </th>
        <td>{fullDetails ? fullDetails[0].postal_code : null} </td>
      </tr>
      <tr>
        <th>Country </th>
        <td>{fullDetails ? fullDetails[0].country : null} </td>
      </tr>
      <tr>
        <th>State</th>
        <td>{fullDetails ? fullDetails[0].state : null} </td>
      </tr>
      <tr>
        <th>Street </th>
        <td>{fullDetails ? fullDetails[0].street : null} </td>
      </tr>
      <tr>
        <th>Phone </th>
        <td>{fullDetails ? fullDetails[0].phone : null} </td>
      </tr>
      <tr>
        <th>Website URL </th>
        <td>{fullDetails ? fullDetails[0].website_url : null} </td>
      </tr>
      </tbody>
    </table>
  </div>);
};

export default BreweryDetails;