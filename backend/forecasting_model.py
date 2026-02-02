# import pandas as pd
# import numpy as np
# from statsmodels.tsa.arima.model import ARIMA
# import warnings

# warnings.filterwarnings("ignore")

# # -----------------------------
# # Load historical dataset
# # -----------------------------
# DATA_PATH = "Data/area_future_forecasting_dataset.csv"
# df = pd.read_csv(DATA_PATH)

# df["Year"] = df["Year"].astype(int)
# df["Avg_Addiction_Score"] = pd.to_numeric(
#     df["Avg_Addiction_Score"], errors="coerce"
# )

# # -----------------------------
# # Forecast function (FIXED)
# # -----------------------------
# def train_and_forecast(series, steps=10):
#     """
#     Improved ARIMA forecasting with stability
#     """
#     # Sort and difference
#     diff_series = series.diff().dropna()

#     if len(diff_series) < 3:
#         return None

#     model = ARIMA(diff_series, order=(1, 0, 1))
#     model_fit = model.fit()

#     # Forecast differences
#     diff_forecast = model_fit.forecast(steps=steps)

#     # Rebuild original scale
#     last_value = series.iloc[-1]
#     forecasts = []

#     for diff in diff_forecast:
#         last_value += diff
#         forecasts.append(last_value)

#     forecasts = np.array(forecasts)

#     # Clip to realistic range
#     forecasts = np.clip(forecasts, 0, 100)

#     # Confidence intervals
#     conf = model_fit.get_forecast(steps=steps).conf_int()
#     lower = forecasts + conf.iloc[:, 0].values
#     upper = forecasts + conf.iloc[:, 1].values

#     lower = np.clip(lower, 0, 100)
#     upper = np.clip(upper, 0, 100)

#     # City-level variability
#     city_factor = np.random.uniform(0.95, 1.05)
#     forecasts *= city_factor
#     lower *= city_factor
#     upper *= city_factor

#     return forecasts, lower, upper

# # -----------------------------
# # Main forecasting loop
# # -----------------------------
# results = []

# future_years = list(range(df["Year"].max() + 1, df["Year"].max() + 11))

# grouped = df.groupby(["State", "City"])

# for (state, city), group in grouped:
#     group = group.sort_values("Year")
#     series = group["Avg_Addiction_Score"].dropna()

#     if len(series) < 5:
#         print(f"⚠️ Skipping {city}, {state} (not enough data)")
#         continue

#     try:
#         result = train_and_forecast(series, steps=10)

#         if result is None:
#             continue

#         forecasts, lower, upper = result

#         for year, val, lo, hi in zip(
#             future_years, forecasts, lower, upper
#         ):
#             results.append({
#                 "State": state,
#                 "City": city,
#                 "Year": year,
#                 "Predicted_Avg_Addiction_Score": round(float(val), 2),
#                 "Lower_Bound": round(float(lo), 2),
#                 "Upper_Bound": round(float(hi), 2),
#             })

#         print(f"✅ Forecast completed: {city}, {state}")

#     except Exception as e:
#         print(f"❌ Error forecasting {city}, {state}: {e}")

# # -----------------------------
# # Save final CSV
# # -----------------------------
# future_df = pd.DataFrame(results)
# future_df.to_csv("Data/future_area_forecast.csv", index=False)

# print("\n🎉 ALL cities forecasting completed!")
# print("📁 File saved as: Data/future_area_forecast.csv")

import pandas as pd
import numpy as np
from statsmodels.tsa.holtwinters import ExponentialSmoothing
import warnings

warnings.filterwarnings("ignore")

# 1. Load your historical dataset
DATA_PATH = "Data/area_future_forecasting_dataset.csv"
df = pd.read_csv(DATA_PATH)

def train_dynamic_forecast(series, steps=10, volatility=0.05):
    """
    Holt-Winters with Damping + Stochastic Noise for realistic visualization.
    - Damping: Makes the line curve/level off instead of going straight.
    - Volatility: Adds small random fluctuations so it's not a 'ruler' line.
    """
    if len(series) < 5:
        return None
    
    try:
        # Step 1: Damped Holt's Linear Trend
        # damping_slope=0.9 means the trend loses 10% of its strength every year (creating a curve)
        model = ExponentialSmoothing(series, trend='add', damped_trend=True, seasonal=None)
        model_fit = model.fit(damping_slope=0.85, optimized=True)
        
        forecast = model_fit.forecast(steps)
        
        # Step 2: Add Stochastic (Random) Volatility
        # This creates 'natural' wiggles in the line
        np.random.seed(42) 
        noise = np.cumsum(np.random.normal(0, series.std() * volatility, steps))
        forecast = forecast + noise
        
        # Step 3: Confidence Intervals that expand over time
        resid_std = np.std(model_fit.resid)
        # Error grows with the square root of time (standard for forecasts)
        margin = 1.96 * resid_std * np.sqrt(range(1, steps + 1))
        lower = forecast - margin
        upper = forecast + margin
        
        return np.clip(forecast, 0, 100), np.clip(lower, 0, 100), np.clip(upper, 0, 100)
    except:
        return None

# -----------------------------
# Main Execution Loop
# -----------------------------
results = []
future_years = list(range(df["Year"].max() + 1, df["Year"].max() + 11))

for (state, city), group in df.groupby(["State", "City"]):
    series = group.sort_values("Year")["Avg_Addiction_Score"].values
    
    res = train_dynamic_forecast(series, steps=10)
    
    if res:
        f, l, u = res
        for i, year in enumerate(future_years):
            results.append({
                "State": state,
                "City": city,
                "Year": year,
                "Predicted_Avg_Addiction_Score": round(f[i], 2),
                "Lower_Bound": round(l[i], 2),
                "Upper_Bound": round(u[i], 2),
                "Confidence_Interval_Width": round(u[i] - l[i], 2)
            })

# Save to CSV
future_df = pd.DataFrame(results)
future_df.to_csv("Data/future_area_forecast.csv", index=False)

print("✅ Dynamic Forecast (Non-Linear) generated successfully!")