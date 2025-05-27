import { useState } from 'react';

function Card({ children }) {
  return <div className="bg-white rounded-2xl shadow-md p-6 w-full">{children}</div>;
}

function CardContent({ children }) {
  return <div className="space-y-4">{children}</div>;
}

function Button({ children, ...props }) {
  return (
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl w-full"
      {...props}
    >
      {children}
    </button>
  );
}

function Input(props) {
  return (
    <input
      className="border rounded-xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  );
}

function Label({ children }) {
  return <label className="font-medium block mb-1">{children}</label>;
}

function Select({ value, onChange, children }) {
  return (
    <select
      className="border rounded-xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {children}
    </select>
  );
}

function Option({ value, children }) {
  return <option value={value}>{children}</option>;
}

export default function CalorieCalculator() {
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [activity, setActivity] = useState('1.2');
  const [result, setResult] = useState(null);

  const calculateTDEE = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const act = parseFloat(activity);

    if (!w || !h || !a) return;

    let bmr;
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const tdee = Math.round(bmr * act);
    setResult(tdee);
  };

  return (
    <div className="max-w-md mx-auto mt-10 text-black">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold text-center mb-4">احسب السعرات لثبات الوزن</h2>

             <div>
            <Label>النوع</Label>
            <Select value={gender} onChange={setGender}>
              <Option value="male">ذكر</Option>
              <Option value="female">أنثى</Option>
            </Select>
          </div>

             <div>
            <Label className="block mb-1 text-black">الوزن (كجم)</Label>
            <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} />
          </div>

          <div>
            <Label>الطول (سم)</Label>
            <Input  type="number" value={height} onChange={e => setHeight(e.target.value)} />
          </div>

             <div>
            <Label>العمر (بالسنين)</Label>
            <Input type="number" value={age} onChange={e => setAge(e.target.value)} />
          </div>

             <div>
            <Label>مستوى النشاط</Label>
            <Select value={activity} onChange={setActivity}>
              <Option value="1.2">خامل (لا يوجد نشاط)</Option>
              <Option value="1.375">نشاط خفيف (1-3 أيام/أسبوع)</Option>
              <Option value="1.55">نشاط متوسط (3-5 أيام/أسبوع)</Option>
              <Option value="1.725">نشاط عالي (6-7 أيام/أسبوع)</Option>
              <Option value="1.9">نشاط عنيف (تمارين شاقة أو شغل جسدي)</Option>
            </Select>
          </div>

          <Button onClick={calculateTDEE}>
            احسب السعرات
          </Button>

          {result && (
            <div className="text-center mt-4 text-green-600 font-bold text-lg">
              السعرات المطلوبة لثبات الوزن: {result} سعر حراري/يوم
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
