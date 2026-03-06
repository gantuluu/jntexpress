export interface Pengirim {
  nama: string;
  telepon: string;
  alamat: string;
}

export interface Penerima {
  nama: string;
  telepon: string;
  alamat: string;
}

export interface Kordinat {
  titik_asal: string;
  titik_tujuan: string;
}

export interface Tagihan {
  item: string;
  biaya: number;
  fee: number;
  status: string;
}

export interface Refund {
  bank: string;
  nama_rekening: string;
  nomor_rekening: string;
}

export interface RiwayatPerjalanan {
  status: string;
  deskripsi: string;
  lokasi: string;
  date: string;
}

export interface HistoryEvent {
  timestamp: string;
  event: string;
  detail: any;
}

export interface TrackingData {
  nomor_resi: string;
  date: string;
  pengirim: Pengirim | string;
  penerima: Penerima | string;
  kordinat: Kordinat | string;
  tagihan: Tagihan[] | string;
  subtotal: number;
  refund: Refund | string;
  jumlah_refund: number;
  riwayat_perjalanan: RiwayatPerjalanan[] | string;
  history: HistoryEvent[] | string;
  status_pengiriman?: string; // Keep this for UI compatibility
}

export interface VAMethod {
  id: string;
  va_number: string;
  va_name: string;
  img: string;
}
