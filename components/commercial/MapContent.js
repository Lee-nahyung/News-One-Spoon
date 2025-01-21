import React, { useEffect, useState } from 'react';

const MapContent = ({ latitude = 35.871435, longitude = 128.601445, level = 7, onLocationSelect, height = "80vh" }) => {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        // 카카오맵 API 스크립트 추가
        const script = document.createElement("script");
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=807d3340eb4b57a7e18fb7ffeefe6db6&libraries=services&autoload=false";
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                // 지도 옵션 및 객체 생성
                const mapContainer = document.getElementById('map');
                const mapOption = {
                    center: new window.kakao.maps.LatLng(latitude, longitude),
                    level: level,
                };
                const createdMap = new window.kakao.maps.Map(mapContainer, mapOption);
                setMap(createdMap);

                // 마커 초기화
                const initialMarker = new window.kakao.maps.Marker({
                    position: mapOption.center,
                });
                initialMarker.setMap(createdMap);
                setMarker(initialMarker);
            });
        };

        return () => {
            document.head.removeChild(script);
        };
    }, [latitude, longitude, level]);

    useEffect(() => {
        if (map && marker) {
            const geocoder = new window.kakao.maps.services.Geocoder();

            // 지도 클릭 이벤트 리스너 추가
            window.kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
                const clickedLatLng = mouseEvent.latLng;

                // 마커 위치 업데이트
                marker.setPosition(clickedLatLng);

                // 좌표 -> 주소 변환
                geocoder.coord2RegionCode(clickedLatLng.getLng(), clickedLatLng.getLat(), (result, status) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                        // 행정동 정보를 찾고 반환
                        const administrativeRegion = result.find(region => region.region_type === 'H');
                        if (administrativeRegion && onLocationSelect) {
                            const dongOnly = administrativeRegion.address_name.split(' ').pop(); // 마지막 요소 추출
                            onLocationSelect(dongOnly); // 동 이름만 반환
                        }
                    }
                });
            });
        }
    }, [map, marker, onLocationSelect]);

    return <div id="map" style={{ width: "100%", height: height }}></div>;
};

export default MapContent;
