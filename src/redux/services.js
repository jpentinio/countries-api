import axios from "axios";

class Services {
  static async getCountries(value) {
    console.log(value);
    try {
      let response = await axios.get(
        `https://restcountries.com/v3.1/${value}?fields=name,capital,region,population,flags`
      );

      return response;
    } catch (error) {
      throw error.response;
    }
  }

  static async getCountryDetails(value) {
    try {
      let response = await axios.get(
        `https://restcountries.com/v3.1/name/${value}?fields=name,capital,region,subregion,population,flags,tld,currencies,languages,borders`
      );

      return response;
    } catch (error) {
      throw error.response;
    }
  }
}

export default Services;
