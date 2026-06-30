export default {
  "GET /region/province": {
    summary: "Get All Provinces",
    description: "Retrieve a list of all provinces",
    response: {
      success: true,
      status: "OK",
      message: "Provinces retrieved successfully",
      pagination: null,
      data: [
        {
          id: "11",
          name: "ACEH",
        },
      ],
    },
  },

  "GET /region/regency/:provinceId": {
    summary: "Get Regencies by Province ID",
    description: "Retrieve all regencies registered under a specific province ID",
    response: {
      success: true,
      status: "OK",
      message: "Regencies by Province retrieved successfully",
      pagination: null,
      data: [
        {
          id: "1101",
          province_id: "11",
          name: "KABUPATEN ACEH SELATAN",
        },
      ],
    },
  },

  "GET /region/district/:regencyId": {
    summary: "Get Districts by Regency ID",
    description: "Retrieve all districts registered under a specific regency ID",
    response: {
      success: true,
      status: "OK",
      message: "Districts by Regency retrieved successfully",
      pagination: null,
      data: [
        {
          id: "1101010",
          regency_id: "1101",
          name: "BAKONGAN",
        },
      ],
    },
  },

  "GET /region/village/:districtId": {
    summary: "Get Villages by District ID",
    description: "Retrieve all villages registered under a specific district ID",
    response: {
      success: true,
      status: "OK",
      message: "Villages by District retrieved successfully",
      pagination: null,
      data: [
        {
          id: "1101010001",
          district_id: "1101010",
          name: "KEUDE BAKONGAN",
        },
      ],
    },
  },
};
