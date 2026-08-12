export default {
  "GET /dashboard/parent": {
    summary: "Get Parent Dashboard",
    description: "Retrieve dashboard statistics and children records for the authenticated parent, including their latest growth measurements",
    response: {
      success: true,
      status: "OK",
      message: "Parent dashboard retrieved successfully",
      pagination: null,
      data: [
        {
          id: "uuid-child-1",
          name: "Ahmad",
          birth_date: "2025-01-01T00:00:00.000Z",
          parent_id: "uuid-parent-1",
          gender: "MALE",
          address: "Jl. Sudirman No. 5",
          status: "NORMAL",
          created_at: "2026-06-30T00:00:00.000Z",
          updated_at: "2026-06-30T00:00:00.000Z",
          measurements: [
            {
              id: "uuid-measurement-1",
              children_id: "uuid-child-1",
              clinic_id: "uuid-clinic-1",
              measurement_date: "2026-07-01T00:00:00.000Z",
              age_month: 18,
              body_weight: 9.4,
              body_height: 74,
              head_circumference: 45,
              zscore_bb: -1.2,
              zscore_tb: -0.8,
              zscore_lk: null,
              zscore_gizi: -1.1,
              created_at: "2026-07-01T00:00:00.000Z",
              updated_at: "2026-07-01T00:00:00.000Z"
            }
          ]
        }
      ]
    }
  },

  "GET /dashboard/cadre": {
    summary: "Get Cadre Dashboard",
    description: "Retrieve dashboard overview for the authenticated cadre, including clinic information, total registered children, total risky children, and recent measurements",
    response: {
      success: true,
      status: "OK",
      message: "Cadre dashboard retrieved successfully",
      pagination: null,
      data: {
        cadre: {
          id: "uuid-cadre-1",
          name: "John Doe",
          email: "john@example.com",
          clinic_id: "uuid-clinic-1",
          created_at: "2026-06-30T00:00:00.000Z",
          updated_at: "2026-06-30T00:00:00.000Z",
          clinic: {
            id: "uuid-clinic-1",
            name: "Posyandu Melati",
            address: "Jl. Melati",
            village_id: "3301010001",
            created_at: "2026-06-30T00:00:00.000Z",
            updated_at: "2026-06-30T00:00:00.000Z"
          }
        },
        total_children: 12,
        total_risky_children: 2,
        latest_measurements: [
          {
            id: "uuid-measurement-1",
            children_id: "uuid-child-1",
            clinic_id: "uuid-clinic-1",
            measurement_date: "2026-07-01T00:00:00.000Z",
            age_month: 18,
            body_weight: 9.4,
            body_height: 74,
            head_circumference: 45,
            zscore_bb: -1.2,
            zscore_tb: -0.8,
            zscore_lk: null,
            zscore_gizi: -1.1,
            created_at: "2026-07-01T00:00:00.000Z",
            updated_at: "2026-07-01T00:00:00.000Z",
            children: {
              name: "Ahmad",
              status: "LOWRISK"
            }
          }
        ]
      }
    }
  },

  "GET /dashboard/admin": {
    summary: "Get Admin Dashboard",
    description: "Retrieve comprehensive system-wide statistics for the administrator dashboard, covering child statuses, regional coverage metrics, and clinic/cadre counts",
    response: {
      success: true,
      status: "OK",
      message: "Admin dashboard retrieved successfully",
      pagination: null,
      data: {
        childrens: {
          total_children: 150,
          total_risky_children: 15,
          total_normal_children: 135
        },
        regions: {
          total_villages: 8345,
          total_covered_villages: 10,
          total_uncovered_villages: 8335,
          village_percentage: 0.11983
        },
        clinics: {
          total_clinics: 12,
          latest_clinics: [
            {
              id: "uuid-clinic-1",
              name: "Posyandu Melati",
              address: "Jl. Melati",
              village_id: "3301010001",
              created_at: "2026-06-30T00:00:00.000Z",
              updated_at: "2026-06-30T00:00:00.000Z",
              village: {
                name: "KEUDE BAKONGAN"
              }
            }
          ]
        },
        total_cadres: 24
      }
    }
  }
};
