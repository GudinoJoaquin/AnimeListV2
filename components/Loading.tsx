import SkeletonLoading from "expo-skeleton-loading";
import { View } from "react-native";

export const AnimeListCardSkeleton = () => {
  return (
    <SkeletonLoading
      background={"#adadad"}
      highlight={"#ffffff"}
      duration={1500}
    >
      <View
        style={{
          flexDirection: "row",
          padding: 16,
          marginBottom: 20,
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          width: 370,
          height: 200,
        }}
      >
        {/* Imagen de carga */}
        <View
          style={{
            width: 100,
            height: "100%",
            backgroundColor: "#adadad",
            borderRadius: 10,
          }}
        />

        {/* Contenido de la Card */}
        <View style={{ flex: 1, marginLeft: 10 }}>
          {/* Título y Score */}
          <View style={{ marginBottom: 10 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {/* Título de Anime */}
              <View style={{ flexDirection: "column", width: "75%" }}>
                <View
                  style={{
                    backgroundColor: "#adadad",
                    width: "50%",
                    height: 15,
                    marginBottom: 5,
                    borderRadius: 5,
                  }}
                />
              </View>

              {/* Score */}
              <View
                style={{
                  width: 40,
                  height: 15,
                  backgroundColor: "#adadad",
                  borderRadius: 5,
                }}
              />
            </View>

            {/* Título Japonés */}
            <View
              style={{
                backgroundColor: "#adadad",
                width: "30%",
                height: 10,
                borderRadius: 5,
                marginTop: 5,
              }}
            />
          </View>

          {/* Géneros */}
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 10 }}
          >
            <View
              style={{
                backgroundColor: "#adadad",
                width: 60,
                height: 20,
                borderRadius: 10,
                marginRight: 5,
              }}
            />
            <View
              style={{
                backgroundColor: "#adadad",
                width: 60,
                height: 20,
                borderRadius: 10,
                marginRight: 5,
              }}
            />
          </View>

          {/* Subtítulo y Descripción */}
          <View style={{ marginBottom: 5 }}>
            <View
              style={{
                backgroundColor: "#adadad",
                width: "40%",
                height: 10,
                borderRadius: 5,
              }}
            />
          </View>

          {/* Descripción */}
          <View
            style={{
              backgroundColor: "#adadad",
              width: "80%",
              height: 10,
              borderRadius: 5,
            }}
          />
        </View>
      </View>
    </SkeletonLoading>
  );
};

export const RecomendedSkeleton = () => {
  return (
    <View className="bg-[#cecece] w-[152px] h-[217px] rounded-xl mx-[10px]">
      <SkeletonLoading
      background={"#adadad"}
      highlight={"#ffffff"}
      duration={1500}
    >
      <View
        style={{
          flexDirection: "column",
          paddingTop: 16,
          paddingBottom: 16,
          paddingLeft: 10,
          marginBottom: 20,
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          width: 370,
          height: 206,
        }}
      >
        {/* Imagen de carga */}
        <View
          style={{
            width: 100,
            height: "100%",
            // backgroundColor: "#adadad",
            borderRadius: 10,
          }}
        />

        {/* Contenido de la Card */}
        <View style={{ flex: 1 }}>
          {/* Título y Score */}
          <View style={{ marginBottom: 10 }}>
            <View
              style={{ flexDirection: "column"}}
            >
              {/* Título de Anime */}
              <View style={{ flexDirection: "column" }}>
                <View
                  style={{
                    backgroundColor: "#adadad",
                    width: "30%",
                    height: 15,
                    marginBottom: 5,
                    borderRadius: 5,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </SkeletonLoading>
    </View>
  );
};

// <SkeletonLoading
//         background={"#d9d9d9"}
//         highlight={"#ffffff"}
//         duration={1500}
//       >
//         <View
//           style={{
//             width: 152,
//             height: 217,
//             borderRadius: 10,
//           }}
//         >
//           <View
//             style={{
//               width: "100%",
//               height: "100%",
//               borderRadius: 10,
//               backgroundColor: '#dd0505'
//             }}
//           />
//         </View>
//       </SkeletonLoading>
