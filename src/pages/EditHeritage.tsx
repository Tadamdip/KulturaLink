import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import type { Custodian } from "../types/Custodian";
import type { Festival } from "../types/Festival";

function EditHeritage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    origin: "",
    yearOfRecognition: "",
    province: "",
    municipality: "",
    latitude: "",
    longitude: "",
    description: "",
    culturalSignificance: "",
    preservationStatus: "",
    imageUrl: "",
    custodianId: "",
    festivalIds: [] as string[],
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [custodians, setCustodians] = useState<Custodian[]>([]);
  const [festivals, setFestivals] = useState<Festival[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      const custodianSnapshot = await getDocs(collection(db, "custodians"));
      const custodianData = custodianSnapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      })) as Custodian[];

      const festivalSnapshot = await getDocs(collection(db, "festivals"));
      const festivalData = festivalSnapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      })) as Festival[];

      setCustodians(custodianData);
      setFestivals(festivalData);
    };

    const fetchRecord = async () => {
      if (!id) {
        setMessage("Record ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "heritageItems", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const recordData = docSnap.data();

          setFormData((previous) => ({
            ...previous,
            ...recordData,
            festivalIds: Array.isArray(recordData.festivalIds)
              ? recordData.festivalIds
              : [],
          }));
        } else {
          setMessage("Record not found.");
        }
      } catch (error: unknown) {
        setMessage(
          error instanceof Error ? error.message : "Failed to load heritage record."
        );
      } finally {
        setLoading(false);
      }
    };

    void fetchOptions();
    void fetchRecord();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    try {
      await updateDoc(doc(db, "heritageItems", id), {
        ...formData,
      });

      setMessage("Heritage record updated successfully!");

      setTimeout(() => {
        navigate("/heritage-records");
      }, 1000);
    } catch (error: unknown) {
      setMessage(
        error instanceof Error ? error.message : "Failed to update heritage record."
      );
    }
  };

  if (loading) {
    return <p className="text-gray-600 dark:text-slate-300">Loading record...</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#3E2F26] dark:text-slate-100">
          Edit Heritage Record
        </h1>
        <p className="text-gray-600 dark:text-slate-300 mt-2">
          Update cultural heritage information and preservation details.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-gray-100 dark:border-slate-700 p-8">
        {message && (
          <div className="mb-6 bg-green-100 text-green-700 px-4 py-3 rounded-xl font-semibold">
            {message}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-[#3E2F26] dark:text-slate-100 mb-4">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  Heritage Name
                </label>
                <input
                  name="name"
                  placeholder="Enter heritage name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-[#556B2F] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  Heritage Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-[#556B2F] outline-none"
                >
                  <option value="">Select Type</option>
                  <option value="Tangible">Tangible</option>
                  <option value="Intangible">Intangible</option>
                  <option value="Natural">Natural</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  Origin
                </label>
                <input
                  name="origin"
                  placeholder="Example: Maranao, Ifugao, Cebuano, local community"
                  value={formData.origin}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-[#556B2F] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  Year of Recognition
                </label>
                <input
                  type="number"
                  name="yearOfRecognition"
                  placeholder="Example: 1998"
                  value={formData.yearOfRecognition}
                  onChange={handleChange}
                  required
                  min="1500"
                  max={new Date().getFullYear()}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-[#556B2F] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  Province
                </label>
                <input
                  name="province"
                  placeholder="Enter province"
                  value={formData.province}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-[#556B2F] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  City/Municipality
                </label>
                <input
                  name="municipality"
                  placeholder="Enter city or municipality"
                  value={formData.municipality}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-[#556B2F] outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#3E2F26] dark:text-slate-100 mb-4">
              Location Coordinates
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  Latitude
                </label>
                <input
                  name="latitude"
                  placeholder="Example: 7.9986"
                  value={formData.latitude}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-[#556B2F] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  Longitude
                </label>
                <input
                  name="longitude"
                  placeholder="Example: 124.2928"
                  value={formData.longitude}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-[#556B2F] outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#3E2F26] dark:text-slate-100 mb-4">
              Cultural Details
            </h2>

            <div className="grid grid-cols-1 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Describe the heritage item"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-[#556B2F] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  Cultural Significance
                </label>
                <textarea
                  name="culturalSignificance"
                  placeholder="Explain the importance of this heritage item"
                  value={formData.culturalSignificance}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-[#556B2F] outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#3E2F26] dark:text-slate-100 mb-4">
              Status, Relations, and Media
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  Preservation Status
                </label>
                <select
                  name="preservationStatus"
                  value={formData.preservationStatus}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-[#556B2F] outline-none"
                >
                  <option value="">Select Status</option>
                  <option value="Good">Good</option>
                  <option value="Needs Preservation">Needs Preservation</option>
                  <option value="Endangered">Endangered</option>
                  <option value="Restored">Restored</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  Image URL
                </label>
                <input
                  name="imageUrl"
                  placeholder="Paste image link here"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-[#556B2F] outline-none"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                Custodian Organization
              </label>
              <select
                name="custodianId"
                value={formData.custodianId}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-[#556B2F] outline-none"
              >
                <option value="">Select custodian</option>
                {custodians.map((custodian) => (
                  <option key={custodian.id} value={custodian.id}>
                    {custodian.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                Related Festivals or Events
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-xl border border-gray-300 dark:border-slate-600 dark:bg-slate-700 p-4">
                {festivals.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    No festivals or events registered yet.
                  </p>
                ) : (
                  festivals.map((festival) => (
                    <label
                      key={festival.id}
                      className="flex items-start gap-3 rounded-lg bg-[#F8F5F0] dark:bg-slate-800 px-4 py-3 cursor-pointer hover:bg-[#EFE7D8] dark:hover:bg-slate-700 transition"
                    >
                      <input
                        type="checkbox"
                        value={festival.id}
                        checked={formData.festivalIds.includes(festival.id || "")}
                        onChange={(e) => {
                          const festivalId = e.target.value;

                          setFormData({
                            ...formData,
                            festivalIds: e.target.checked
                              ? [...formData.festivalIds, festivalId]
                              : formData.festivalIds.filter((itemId) => itemId !== festivalId),
                          });
                        }}
                        className="mt-1 accent-[#556B2F]"
                      />

                      <span>
                        <span className="block font-semibold text-[#3E2F26] dark:text-slate-100">
                          {festival.name}
                        </span>
                        <span className="block text-sm text-gray-600 dark:text-slate-400">
                          {festival.type}
                          {festival.date ? ` • ${festival.date}` : ""}
                        </span>
                      </span>
                    </label>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/heritage-records")}
              className="px-6 py-3 rounded-xl border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#556B2F] hover:bg-[#445523] text-white font-semibold shadow transition"
            >
              Update Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditHeritage;
