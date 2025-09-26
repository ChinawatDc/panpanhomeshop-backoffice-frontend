export default function CheckoutPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold">ชำระเงิน</h2>
      <form className="space-y-4 mt-4">
        <input
          type="text"
          placeholder="ชื่อ-นามสกุล"
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="ที่อยู่จัดส่ง"
          className="border p-2 w-full"
        />
        <button className="px-4 py-2 bg-green-600 text-white rounded">
          ยืนยันการสั่งซื้อ
        </button>
      </form>
    </div>
  );
}
