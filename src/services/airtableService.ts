import axios from "axios";

const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const BASE_ID = "app7ChWzcIuTo2ZS7";

const airtable = axios.create({
  baseURL: `https://api.airtable.com/v0/${BASE_ID}`,
  headers: {
    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
  },
});

export const getTrackingData = async (nomorResi: string) => {
  try {
    const response = await airtable.get("/jntexpress", {
      params: {
        filterByFormula: `{nomor_resi}='${nomorResi}'`,
      },
    });
    const record = response.data.records[0];
    if (!record) return null;
    return { id: record.id, ...record.fields };
  } catch (error) {
    console.error("Error fetching tracking data:", error);
    return null;
  }
};

export const updateTrackingData = async (recordId: string, fields: any) => {
  try {
    const response = await airtable.patch("/jntexpress", {
      records: [
        {
          id: recordId,
          fields: fields,
        },
      ],
    });
    return response.data.records[0].fields;
  } catch (error) {
    console.error("Error updating tracking data:", error);
    return null;
  }
};

export const getBanners = async () => {
  try {
    const response = await airtable.get("/list_banner");
    return response.data.records.map((record: any) => record.fields);
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
};

export const createOrder = async (orderData: any) => {
  try {
    const resi = `JNT${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const now = new Date().toISOString();
    
    const response = await airtable.post("/jntexpress", {
      records: [
        {
          fields: {
            nomor_resi: resi,
            date: now,
            pengirim: JSON.stringify(orderData.pengirim),
            penerima: JSON.stringify(orderData.penerima),
            subtotal: orderData.subtotal || 0,
            status_pengiriman: "Pending",
            riwayat_perjalanan: JSON.stringify([
              {
                status: "Order Created",
                deskripsi: "Pesanan telah dibuat",
                lokasi: "Sistem",
                date: now,
              },
            ]),
            history: JSON.stringify([
              {
                timestamp: now,
                event: "ORDER_CREATED",
                detail: { resi }
              }
            ])
          },
        },
      ],
    });
    return response.data.records[0].fields;
  } catch (error) {
    console.error("Error creating order:", error);
    return null;
  }
};

export const getVAMethods = async () => {
  try {
    const response = await airtable.get("/va");
    return response.data.records.map((record: any) => ({
      id: record.id,
      ...record.fields
    }));
  } catch (error) {
    console.error("Error fetching VA methods:", error);
    return [];
  }
};

export const getEvents = async () => {
  try {
    const response = await airtable.get("/EventList");
    return response.data.records.map((record: any) => ({
      id: record.id,
      ...record.fields
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const getNews = async () => {
  try {
    const response = await airtable.get("/NewsList");
    return response.data.records.map((record: any) => ({
      id: record.id,
      ...record.fields
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
