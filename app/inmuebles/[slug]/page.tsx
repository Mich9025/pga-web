import BackButton from "@/components/back";
import { Container, Prose, Section } from "@/components/craft";
import { SectionHeader } from "@/components/header/SectionHeader";
import { generateMetadataFromContent } from "@/lib/metadata";
import { getPropertyBySlug } from "@/lib/wordpress";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Slider from "./Slider";

const generalList = [
  {
    icon: "/utility.png",
    title: "Utilities",
    description: "Renter is responsible",
  },
  {
    icon: "/pet.png",
    title: "Pet Policy",
    description: "Pets Allowed",
  },
  {
    icon: "/fee.png",
    title: "Property Fees",
    description: "Must have 3x the rent in total household income",
  },
];

const roomList = [
  {
    icon: "/size.png",
    title: "80sqm(861sqft)",
  },
  {
    icon: "/bed.png",
    title: "2 bed",
  },
  {
    icon: "/bath.png",
    title: "1 bathroom",
  },
];

const nearPlaces = [
  {
    icon: "/school.png",
    title: "Hospital",
    description: "250m away",
  },
  {
    icon: "/bus.png",
    title: "School",
    description: "100m away",
  },
  {
    icon: "/restaurant.png",
    title: "Restaurant",
    description: "200m away",
  },
];
export default async function PropertyPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const { slug } = await params;
    console.log("Attempting to fetch property with slug:", slug);
    const property = await getPropertyBySlug(slug);
    console.log("API Response:", property);

    if (!property) {
      notFound();
    }
    const meta_data = property.meta_data.reduce(
      (acc, meta) => ({
        ...acc,
        [meta.key]: meta.value,
      }),
      {} as Record<string, string | object>
    );

    const meta = {
      rank_math_seo_score: String(meta_data.rank_math_seo_score),
      imagen_principal: String(meta_data.imagen_principal),
      imagen_principal_2: String(meta_data.imagen_principal_2),
      imagen_principal_3: String(meta_data.imagen_principal_3),
      imagen_principal_4: String(meta_data.imagen_principal_4),
      precio: String(meta_data.precio),
      area: String(meta_data.area),
      direccion: String(meta_data.direccion),
      administracion: String(meta_data.administracion),
      altura: String(meta_data.altura),
      acabados: String(meta_data.acabados),
      punto_electrico: String(meta_data.punto_electrico),
      punto_hidraulico: String(meta_data.punto_hidraulico),
      voz_y_datos: String(meta_data.voz_y_datos),
      habitaciones: String(meta_data.habitaciones),
      banos: String(meta_data.banos),
      cocina: String(meta_data.cocina),
      deposito: String(meta_data.deposito),
      terraza: String(meta_data.terraza),
      salas: String(meta_data.salas),
      parking: String(meta_data.parking),
      rank_math_internal_links_processed: String(
        meta_data.rank_math_internal_links_processed
      ),
    };

    return (
      <>
        <SectionHeader
          title={property.name}
          description={property.name}
          image={property.images[0].src}
        />
        <Section>
          <Container>
            <div className="flex flex-col md:flex-row h-full sm:px-8 px-3 max-w-7xl mx-auto">
              <div className="md:flex-auto md:w-64">
                <div className="pr-3">
                  <Slider
                    images={property?.images?.map((image) => image.src)}
                  />
                  <pre>{JSON.stringify(meta_data, null, 2)}</pre>
                  <div className="info">
                    <div className="flex justify-between">
                      <div className="flex flex-col gap-5">
                        <h1 className="font-bold">{property.name}</h1>
                        <div className="flex gap-1 items-center text-gray-400 text-sm">
                          <img src="/pin.png" alt="" className="w-4 h-4" />
                          <span>{meta.direccion}</span>
                        </div>
                        {meta.precio && (
                          <div className="text-xl font-light p-1 rounded bg-amber-300/50 w-fit">
                            <span>$ {meta.precio}</span>
                          </div>
                        )}
                      </div>
                      {/* <div className="flex flex-col items-center justify-center gap-5 px-12 rounded bg-amber-300/50 font-semibold ">
								<img
									src={userData.img}
									alt=""
									className="w-12 h-12 rounded-full object-cover"
								/>
								<span>{userData.name}</span>
							</div> */}
                    </div>
                    <div
                      className="mt-12 prose leading-5"
                      dangerouslySetInnerHTML={{
                        __html: property.short_description,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="md:flex-auto md:w-32 md:bg-[#fcf5f3] md:px-3">
                <div className="py-6">
                  <p className="py-4 font-bold">General</p>
                  <div className="bg-[#fcf5f3] p-4 rounded-md">
                    <div className="flex flex-col gap-5">
                      {generalList.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4"
                        >
                          <img src={item.icon} alt="" className="w-6 h-6" />
                          <div>
                            <p className="font-bold">{item.title}</p>
                            <p className="text-sm">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="py-6 font-bold">Sizes</p>
                  <div className="bg-[#fcf5f3] p-4 rounded-md">
                    <div className="flex flex-col gap-5">
                      {roomList.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4 bg-white p-2 rounded w-fit"
                        >
                          <img src={item.icon} alt="" className="w-6 h-6" />
                          <div>
                            <p className="text-gray-600">{item.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="py-6 font-bold">Nearby Places</p>
                  <div className="bg-[#fcf5f3] p-4 rounded-md">
                    <div className="flex flex-col gap-5">
                      {nearPlaces.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4"
                        >
                          <img src={item.icon} alt="" className="w-6 h-6" />
                          <div>
                            <p className="font-bold">{item.title}</p>
                            <p className="text-sm">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
          <Container className="space-y-6">
            <pre>{JSON.stringify(property, null, 2)}</pre>
            <Prose className="mb-8">
              <h1>{property.name}</h1>
              <p className="text-xl font-bold">${property.price}</p>
              <div dangerouslySetInnerHTML={{ __html: property.description }} />
              {/* Add more property details here */}
            </Prose>
            <BackButton />
          </Container>
        </Section>
      </>
    );
  } catch (error) {
    console.error("Error:", error);
    notFound();
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const property = await getPropertyBySlug(params.slug);

  if (!property) {
    return generateMetadataFromContent({
      title: "Property Not Found",
      description: "The requested property could not be found",
      path: `/inmobiliaria-360/${params.slug}`,
    });
  }

  return generateMetadataFromContent({
    title: property.name,
    description: property.short_description?.replace(/<[^>]*>/g, "") || "",
    path: `/inmobiliaria-360/${property.slug}`,
    image: property.images?.[0]?.src,
    type: "article",
    publishedTime: property.date_created,
    modifiedTime: property.date_modified,
  });
}
